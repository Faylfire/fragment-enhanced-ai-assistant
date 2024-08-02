import React from 'react';
//import NavBar from './NavBar';
//import TopicList from './TopicList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatList, ChatMessage, ChatEntry } from '@/types/types';



function ChatTabs({chatList, ...props}: {chatList:ChatList}) {
  return (
    <Tabs defaultValue={chatList[0].id} className="w-full">
         <TabsList >
            {chatList.map((chat: ChatEntry)=>{
                return <TabsTrigger key={chat.id} value={chat.id}>{chat.chatTitle}</TabsTrigger>
            })}
        </TabsList>
        {chatList.map((chat:ChatEntry)=>{
            return (<TabsContent key={`chatContent-${chat.id}`} value={chat.id}>
                {chat.chatContent.map((line:ChatMessage, index:number)=>{
                    return <p key={`${chat.id}-${index}`}>{`${line.role}: ${line.content}`}</p>
                })}
                </TabsContent>)
        })}    
    </Tabs>
  );
}

export default ChatTabs;