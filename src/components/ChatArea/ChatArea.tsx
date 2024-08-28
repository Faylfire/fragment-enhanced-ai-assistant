import { React, useState } from "react";
import ChatTabs from "./ChatTabs";
import { Button } from "@/components/ui/button";
import { ChatList, ChatEntry } from "@/types/types";
import { ExpandingTextarea } from "@/components/Custom/ExpandingTextarea";
import { addCollectionEntry } from "@/services/dataAccess";
import { ChatProvider } from "@/context/ChatContext";
import { dummyChats } from "@/lib/sharedConstants";

// Example usage:
const chatList: ChatList = dummyChats;

const newChat: ChatEntry = {
  id: "3",
  chatTitle: "Tech Support2",
  chatContent: [],
};

function ChatArea() {
  const [inputText, setInputText] = useState<string>("");

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  return (
    <ChatProvider>
      <div className="chat-area relative h-screen">
        <div className="h-screen">
          <ChatTabs initChatList={chatList} />
        </div>
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
              addCollectionEntry();
              console.log({ inputText });
            }}
          >
            Add Chat
          </Button>
        </div>
      </div>
    </ChatProvider>
  );
}

export default ChatArea;
