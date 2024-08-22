import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatList, ChatMessage, ChatEntry } from "@/types/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ExpandingTextarea } from "@/components/Custom/ExpandingTextarea";
import { ArrowRight } from "lucide-react";

export default function ChatMessagesDisplay({ initChat = [] }) {
  const [chat, setChat] = useState(initChat);
  const [inputText, setInputText] = useState<string>("");
  const chatOutputRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  //On Sending Message to LLM API
  const handleSubmit = useCallback(() => {
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

    setInputText(""); // Clear the input after submission
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
    <TabsContent
      className="h-full"
      key={`chatContent-${chat.id}`}
      value={chat.id}
    >
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
        <ExpandingTextarea
          className="rounded-2xl w-full"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="How can I help you?"
        />
        <Button className="rounded-2xl" type="submit" onClick={handleSubmit}>
          Send
          <ArrowRight />
        </Button>
      </div>
    </TabsContent>
  );
}
