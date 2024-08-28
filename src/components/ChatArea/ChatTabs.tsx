import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatList, ChatMessage, ChatEntry } from "@/types/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import { Separator } from "@/components/ui/separator";

function ChatTabs({ initChatList }: { initChatList: ChatList }) {
  const [chatList, setChatList] = useState(initChatList);
  const [activeTab, setActiveTab] = useState(chatList[0].id);

  const { chat, chats, currentChatTabs } = useChatContext();

  const addNewTab = () => {
    const newChat: ChatEntry = {
      id: `chat-${Date.now()}`,
      chatTitle: `New Chat ${chatList.length + 1}`,
      chatContent: [],
    };
    setChatList([...chatList, newChat]);
    setActiveTab(newChat.id);
  };

  useEffect(() => {
    setChatList(currentChatTabs);
    setActiveTab(currentChatTabs[currentChatTabs.length - 1].id);
  }, [currentChatTabs]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full h-screen flex flex-col"
    >
      <TabsList className="sticky top-0 z-10 mb-0 items-center justify-start rounded-none w-full flex flex-nowrap">
        {chatList.map((chat: ChatEntry, index: number) => {
          return (
            <div className="flex flex-shrink min-w-[25px] max-w-[150px] items-center justify-start">
              {index !== 0 && <p>|</p>}
              <TabsTrigger
                className="hover:bg-highlight flex-shrink min-w-[50px] max-w-[150px] mb-0"
                key={chat.id}
                value={chat.id}
              >
                <p className="truncate">{chat.chatTitle}</p>
              </TabsTrigger>
            </div>
          );
        })}
        <Button
          variant="ghost"
          size="icon"
          onClick={addNewTab}
          className="flex-shrink-0 m-1 w-8 hover:bg-highlight rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </TabsList>
      {chatList.map((chat: ChatEntry) => {
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
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

export default ChatTabs;
