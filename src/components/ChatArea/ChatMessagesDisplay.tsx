import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatList, ChatMessage, ChatEntry } from "@/types/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
//import { ExpandingTextarea } from "@/components/Custom/ExpandingTextarea";
import { ExpandingContentEditable } from "@/components/Custom/ExpandingContentEditable";
import { ArrowRight } from "lucide-react";
import { lmClient } from "@/services/openConfig";
import { useChatContext } from "@/context/ChatContext";
import { useFormContext } from "@/context/FormContext";
import { systemWritingPrompt } from "@/lib/sharedConstants";

export default function ChatMessagesDisplay({ initChat = [] }) {
  const [chat, setChat] = useState(initChat);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const chatOutputRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef(null);
  const chatRef = useRef(null);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const { updateChatEntry, modelName } = useChatContext();
  const { supportingEntryIds, entries } = useFormContext();

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  //On Sending Message to LLM API
  const handleSubmit = useCallback(async () => {
    const inputMessage = contentEditableRef?.current.innerText.trim();
    if (!inputMessage) return;
    console.log(`Sending Prompt for ${chat.id}: `, { inputText });
    console.log(
      `Sending Keywords for ${chat.id}: `,
      [...supportingEntryIds].length
    );
    // Add chat submission logic here
    const enhancedPrompt = enhancePrompt(
      inputMessage,
      supportingEntryIds,
      entries
    );

    const sysPrompt = enhanceSystemPrompt(supportingEntryIds, entries);

    const userMessage = { role: "user", content: inputMessage };
    const systemMessage = { role: "system", content: sysPrompt };
    console.log(systemMessage);
    const userMessageWithContext = [
      systemMessage,
      ...chat.chatContent,
      userMessage,
    ];
    setChat((prevChat) => ({
      ...prevChat,
      chatContent: [...prevChat.chatContent, userMessage],
    }));

    controllerRef.current = new AbortController();
    setInputText(""); // Clear the input after submission
    setIsLoading(true);

    console.log(lmClient);
    try {
      const stream = await lmClient.chat.completions.create({
        model: modelName,
        messages: userMessageWithContext,
        stream: true,
        temperature: 0.7,
        max_tokens: -1,
      });

      let assistantResponse = "";
      const assistantMessage = { role: "assistant", content: "" };
      setChat((prevChat) => ({
        ...prevChat,
        chatContent: [...prevChat.chatContent, assistantMessage],
      }));

      for await (const chunk of stream) {
        if (controllerRef.current.signal.aborted) {
          console.log("Request aborted");
          throw new Error("Request aborted");
        }
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          assistantResponse += content;
          setChat((prevChat) => {
            const updatedMessages = [...prevChat.chatContent];
            updatedMessages[updatedMessages.length - 1].content =
              assistantResponse;
            const updatedChat = {
              ...prevChat,
              chatContent: updatedMessages,
            };
            return updatedChat;
          });
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      if (error.name === "AbortError" || error.message === "Request aborted") {
        console.log("Generation was aborted");
      } else {
        console.log("Error: ", error);
      }
    } finally {
      setIsLoading(false);
      updateChatEntry(chat.id, chatRef.current);
    }
  }, [inputText]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  //scroll to the newest chat response
  useEffect(() => {
    if (chatOutputRef.current) {
      const scrollableNode = chatOutputRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollableNode) {
        scrollableNode.scrollTop = scrollableNode.scrollHeight;
      }
    }
  }, [chat.chatContent]);

  useEffect(() => {
    console.log("run once chat tab load");
  }, []);

  return (
    <TabsContent className="h-full" value={chat.id}>
      <ScrollArea className="h-screen rounded-md border" ref={chatOutputRef}>
        <div className="pb-[150px] pt-[10px]">
          {chat.chatContent.map((line: ChatMessage, index: number) => {
            return (
              <div className={`m-2`} key={`${chat.id}-${index}`}>
                <p
                  className={`px-2 ${
                    line.role !== "user" ? "text-right" : "text-left"
                  }`}
                >{`${line.role}`}</p>
                <p className="p-2 rounded-xl bg-muted">{`${line.content}`}</p>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <div className="absolute bottom-10 w-[80%] bg-black/95 text-background rounded-3xl p-2 flex justify-around gap-4 left-1/2 -translate-x-1/2">
        <ExpandingContentEditable
          className="rounded-2xl w-full"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder=""
          contentEditableRef={contentEditableRef}
        />
        <Button
          className="rounded-2xl"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Send
          <ArrowRight />
        </Button>
      </div>
    </TabsContent>
  );
}

function enhancePrompt(prompt, supportingIds, entries) {
  const augPrompt = prompt;

  return augPrompt;
}

function enhanceSystemPrompt(supportingIds, entries) {
  let systemPrompt: string = systemWritingPrompt;
  const ids = [...supportingIds];
  //Get relevant entries and provide them with the prompt

  for (let id of ids) {
    const result = entries.find((entry) => entry.id === id);
    const { tags, ...resWithoutTags } = result.content;
    systemPrompt = `${systemPrompt}
    ${JSON.stringify(resWithoutTags)}`;
  }
  return systemPrompt;
}

/*
You are an expert fiction writer. 
Always keep the following rules in mind: 
- Write in past tense and use US English spelling, grammar, and colloquialisms/slang. 
- Write in active voice 
- Always follow the "show, don't tell" principle. 
- Avoid adverbs and cliches and overused/commonly used phrases. Ain for fresh and original descriptions. 
- Convey events and story through dialogue. 
- Mix short, punchy sentences with long, descriptive ones. Drop fill words to add variety. 
- Skip "he/she said said" dialogue tags and convoy people's actions or face expressions through their speech 
- Avoid mushy dialog and descriptions, have dialogue always continue the action, never stall or add unnecessary fluff. Vary the descriptions to not repeat yourself. 
- Put dialogue on its own paragraph to separate scene and action. 
- Reduce indicators of uncertainty like 'trying" or "maybe" 

Take into account the specific descriptions of the named types of characters/locations/lore/guideline/trope/other...: 



Continue the story and write about 480 words for the following instructions: 
*/
/*
        <ExpandingTextarea
          className="rounded-2xl w-full"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="How can I help you?"
        />

                <ExpandingContentEditable
          className="rounded-2xl w-full"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder=""
        />
        */
