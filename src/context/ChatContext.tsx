import React, { createContext, useContext, useState, useEffect } from "react";
import { Entry, EntryPlusID } from "@/types/types";
import {
  addChat,
  getNewChatRef,
  updateChat,
  collectionName,
} from "@/services/dataAccess";
import { database } from "@/services/firebaseAPI";
import { ref, onValue, off } from "firebase/database";
import { simpleIsEqual } from "@/lib/utils";
import { dummyChats } from "@/lib/sharedConstants";

const ChatContext = createContext();
const chatListRef = ref(database, `${collectionName}/chats`);
const chatContentRef = ref(database, `${collectionName}/chatContent`);

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState({
    id: `chat-${Date.now()}`,
    chatTitle: "New Chat",
    chatContent: [],
  }); //newChat `New Chat ${chatList.length + 1}`

  const [chatList, setChatList] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChatTabs, setCurrentChatTabs] = useState(dummyChats);

  function saveNewChat(chat) {
    console.log("in Save New Chat");
    const chatRef = getNewChatRef();
    let newChat = { ...chat, id: chatRef.key };
    console.log("New Chat REF: ", chatRef.key);
    addChat(chatRef, newChat);
  }

  //Tests if the this updateChatEntry comes from a newly created chat
  function isNewChat(chats, idToCheck) {
    return !chats.some((item) => item.id === idToCheck);
  }

  function updateChatEntry(id, chat) {
    if (isNewChat(chatList, id)) {
      saveNewChat(chat);
    } else {
      updateChat(id, chat);
    }
  }
  //Subscribing to onValue changes to chatList
  useEffect(() => {
    const handleChatList = (snapshot: any) => {
      console.log("Chatlist onvalue called");
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val());
        const chatTabs = [];
        console.log(data);
        for (let item of data) {
          chatTabs.push({ ...item[1].chat, id: item[0] });
        }
        setChatList(chatTabs);
        setCurrentChatTabs(chatTabs);
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
        updateChatEntry,
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
