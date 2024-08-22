import { React, useState } from "react";
import ChatTabs from "./ChatTabs";
import ChatTabsWithInput from "./ChatTabsWithInput";
import { ChatList, ChatEntry } from "@/types/types";
import { ChatProvider } from "@/context/ChatContext";
import { dummyChats } from "@/lib/sharedConstants";

const chatList: ChatList = dummyChats;

function ChatArea() {
  return (
    <ChatProvider>
      <div className="chat-area relative h-screen">
        <div className="h-screen">
          <ChatTabsWithInput initChatList={chatList} />
        </div>
      </div>
    </ChatProvider>
  );
}

export default ChatArea;
