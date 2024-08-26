import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatList, ChatMessage, ChatEntry } from "@/types/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ExpandingTextarea } from "@/components/Custom/ExpandingTextarea";
import { ExpandingContentEditable } from "@/components/Custom/ExpandingContentEditable";
import { ArrowRight } from "lucide-react";
import { lmClient } from "@/services/openConfig";
import { useChatContext } from "@/context/ChatContext";

export default function ChatMessagesDisplay({ initChat = [] }) {
  const [chat, setChat] = useState(initChat);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const chatOutputRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef(null);
  const chatRef = useRef(null);
  const { updateChatEntry } = useChatContext();

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  //On Sending Message to LLM API
  const handleSubmit = useCallback(async () => {
    const inputMessage = inputText.trim();
    if (!inputMessage) return;
    console.log(`Sending Prompt for ${chat.id}: `, { inputText });
    // Add chat submission logic here

    const userMessage = { role: "user", content: inputMessage };
    const userMessageWithContext = [...chat.chatContent, userMessage];
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
        model:
          "TheBloke/Mistral-7B-Instruct-v0.2-GGUF/mistral-7b-instruct-v0.2.Q6_K.gguf",
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
      console.log(chatRef.current);
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
