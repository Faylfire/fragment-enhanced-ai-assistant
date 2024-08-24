import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatList, ChatMessage, ChatEntry } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";

import ChatMessagesDisplay from "@/components/ChatArea/ChatMessagesDisplay";

export default function ChatTabsWithInput({
  initChatList,
}: {
  initChatList: ChatList;
}) {
  const [chatList, setChatList] = useState(initChatList);
  const [activeTab, setActiveTab] = useState(chatList[0].id);

  const { currentChatTabs } = useChatContext();

  const addNewTab = () => {
    const newChat: ChatEntry = {
      id: `chat-${Date.now()}`,
      chatID: `chat-${Date.now()}`,
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
            <div
              className="flex flex-shrink min-w-[25px] max-w-[150px] items-center justify-start"
              key={chat.id}
            >
              {index !== 0 && <p>|</p>}
              <TabsTrigger
                className="hover:bg-highlight flex-shrink min-w-[50px] max-w-[150px] mb-0"
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
          <ChatMessagesDisplay initChat={chat} key={`chatContent-${chat.id}`} />
        );
      })}
    </Tabs>
  );
}
