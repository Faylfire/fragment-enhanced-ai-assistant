import React, { createContext, useContext, useState, useEffect } from "react";
import { Entry, EntryPlusID } from "@/types/types";
import { fetchEntries, updateEntry, addEntry } from "@/services/dataAccess";
import { database } from "@/services/firebaseAPI";
import { ref, onValue, off } from "firebase/database";
import { simpleIsEqual } from "@/lib/utils";

const ChatContext = createContext();
const collectionName = "fragmentCollection";
const chatListRef = ref(database, `${collectionName}/chatList`);
const chatContentRef = ref(database, `${collectionName}/chatContent`);

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState({
    id: `chat-${Date.now()}`,
    chatTitle: "New Chat",
    chatContent: [],
  }); //newChat `New Chat ${chatList.length + 1}`

  const [chatList, setChatList] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChatTabs, setCurrentChatTabs] = useState([chat]);

  console.log("current chat TAB:", currentChatTabs);

  //   //Subscribing to onValue change for Chat entries
  //   useEffect(() => {
  //     const handleContent = (snapshot: any) => {
  //       console.log("onvalue called");
  //       if (snapshot.exists()) {
  //         const data = Object.entries(snapshot.val());
  //         const dataEntries: [];
  //         for (let item of data) {
  //           console.log(item[0]);
  //           console.log(item[1]);
  //           dataEntries.push({ id: item[0], content: item[1].content });
  //         }
  //         console.log("dataEntries: ", dataEntries);
  //       }
  //     };

  //     onValue(chatContentRef, handleContent);

  //     return () => off(chatContentRef, "value", handleContent);
  //   }, []);

  //Subscribing to onValue changes to chatList
  useEffect(() => {
    const handleChatList = (snapshot: any) => {
      console.log("Chatlist onvalue called");
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val());
        const chatTabs = [];
        console.log(data);
        for (let item of data) {
          chatTabs.push(item[1]);
        }
        setChatList(chatTabs);
      }
    };

    onValue(chatListRef, handleChatList);

    return () => off(chatListRef, "value", handleChatList);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chat,
        chatList,
        chats,
        currentChatTabs,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
