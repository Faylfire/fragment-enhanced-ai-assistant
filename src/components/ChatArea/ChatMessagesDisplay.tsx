import React, { useState, useEffect } from "react";
//import NavBar from './NavBar';
//import TopicList from './TopicList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatList, ChatMessage, ChatEntry } from "@/types/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ExpandingTextarea } from "@/components/Custom/ExpandingTextarea";

export default function ChatMessagesDisplay({ initChat = [] }) {
  const [chat, setChat] = useState(initChat);
  const [inputText, setInputText] = useState<string>("");

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  useEffect(() => {
    console.log("run once chat tab load");
  }, []);

  return (
    <TabsContent
      className="h-full"
      key={`chatContent-${chat.id}`}
      value={chat.id}
    >
      <ScrollArea className="h-screen rounded-md border">
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
          placeholder="How can I help you?"
        />
        <Button
          className="rounded-2xl"
          type="submit"
          onClick={() => {
            console.log({ inputText });
          }}
        >
          Add Chat
        </Button>
      </div>
    </TabsContent>
  );
}
