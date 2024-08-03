import {React, useState} from 'react';
//import { useTopicContext } from '../../contexts/TopicContext';
//import ChatInput from './ChatInput';
//import ChatMessages from './ChatMessages';
import ChatTabs from './ChatTabs';
import { Button } from "@/components/ui/button"
import { ChatList, ChatEntry} from "@/types/types";
import { Input } from "@/components/ui/input"
import { ExpandingTextarea } from "@/components/Custom/ExpandingTextarea"



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
    chatTitle: 'Chat Overflow',
    chatContent: [
      { role: 'system', content: 'You are a tech support assistant.' },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Each of these locations maintains the structure of the Entry interface while providing unique settings that can enrich your story or game world. You can add these to your existing locationList using the spread operator as shown in the comment at the end of the code snippet." },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart2" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart Let's break down the Tailwind classes and explain the layout: The outermost div uses: flex flex-col: Creates a flexible column layout h-screen: Makes the div take up the full height of the viewport The first inner div (containing ChatTabs and chat bubbles) uses: flex-1: Allows this div to grow and take up all available spaceoverflow-y-auto: Adds a vertical scrollbar if the content overflows" },
       { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart1" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart2" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "This approach allows you to dynamically position your 80%-width div to the left or right of the screen based on the flag prop. The outer w-full div ensures that the inner div has the full screen width as its reference for the 80% calculation." },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart1" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart2" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart Let's break down the Tailwind classes and explain the layout: The outermost div uses: flex flex-col: Creates a flexible column layout h-screen: Makes the div take up the full height of the viewport The first inner div (containing ChatTabs and chat bubbles) uses: flex-1: Allows this div to grow and take up all available spaceoverflow-y-auto: Adds a vertical scrollbar if the content overflows" },
       { role: 'user', content: "My computer won't turn on. I've tried everything." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart1" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart2" },
            { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Each of these locations maintains the structure of the Entry interface while providing unique settings that can enrich your story or game world. You can add these to your existing locationList using the spread operator as shown in the comment at the end of the code snippet." },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart1" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart2" },
      { role: 'user', content: "My computer won't turn on." },
      { role: 'assistant', content: "Let's try some troubleshooting steps. First, make sure to restart Let's break down the Tailwind classes and explain the layout: The outermost div uses: flex flex-col: Creates a flexible column layout h-screen: Makes the div take up the full height of the viewport The first inner div (containing ChatTabs and chat bubbles) uses: flex-1: Allows this div to grow and take up all available spaceoverflow-y-auto: Adds a vertical scrollbar if the content overflows" },
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
   const [inputText, setInputText] = useState<string>(''); 

   const handleInputChange = (value: string) => {
    setInputText(value);
  };

  return (
    <div className="chat-area relative h-screen">
        <div className="h-full overflow-y-auto">
          <ChatTabs chatList={chatList} />
        </div>
        <div className="absolute bottom-10 w-[80%] bg-black/95 text-background rounded-3xl p-4 flex justify-around gap-4 left-1/2 -translate-x-1/2">
          <ExpandingTextarea className="rounded-2xl w-[80%]" value={inputText} onChange={handleInputChange} placeholder="How can I help you?" />
          <Button type="submit" onClick={()=>console.log({inputText})} >Add Chat</Button>
        </div>

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