import React from 'react';
//import { useTopicContext } from '../../contexts/TopicContext';
//import ChatInput from './ChatInput';
//import ChatMessages from './ChatMessages';
import ChatTabs from './ChatTabs';
import { Button } from "@/components/ui/button"
import { ChatList, ChatEntry} from "@/types/types";



// Example usage:
const chatList: ChatList = [
  {
    id: '1',
    chatTitle: 'First Conversation',
    chatContent: [
      { role: 'user', content: 'Hello, how are you?' },
      { role: 'assistant', content: "I'm doing well, thank you! How can I assist you today?" },
    ]
  },
  {
    id: '2',
    chatTitle: 'Tech Support',
    chatContent: [
      { role: 'system', content: 'You are a tech support assistant.' },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure it's plugged in...2" },
    ]
  },
   {
    id: '3',
    chatTitle: 'Tech Support2',
    chatContent: [
      { role: 'system', content: 'You are a tech support assistant.' },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart" },
    ]
  },
  {
    id: '4',
    chatTitle: 'Tech Support Again',
    chatContent: [
      { role: 'system', content: 'You are a tech support assistant.' },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart1" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart2" },
    ]
  }

];

const newChat: ChatEntry =   {
    id: '3',
    chatTitle: 'Tech Support2',
    chatContent: [
      { role: 'system', content: 'You are a tech support assistant.' },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart1" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart2" },
    ]
  }



function ChatArea() {

  return (
    <div className="chat-area">
        <ChatTabs chatList={chatList} />
        <Button onClick={()=>console.log(chatList)} >Add Chat</Button>


    </div>
  );
}

export default ChatArea;
/*
<Button onClick={()=>console.log(chatList)} >Add Chat</Button>
                <Button onClick={()=>{
                    chatList.push(newChat)
                    console.log(chatList.length)
                    
                    }} >Add Chat</Button>*/