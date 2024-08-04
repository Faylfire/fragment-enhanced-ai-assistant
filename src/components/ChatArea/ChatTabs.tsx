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
            return (<TabsContent className="pb-[150px] pt-[20px]" key={`chatContent-${chat.id}`} value={chat.id}>
                {chat.chatContent.map((line:ChatMessage, index:number)=>{
                    return (
                      <div className={`m-2 max-w-[85%] ${line.role!=='user'?'ml-auto':'mr-auto'}`} key={`${chat.id}-${index}`}>
                        <p className={`px-2 ${line.role!=='user'?'text-right':'text-left'}`}>{`${line.role}`}</p>
                        <p className='p-2 rounded-xl bg-muted'>{`${line.content}`}</p>
                      </div>
                    )
                })}
                </TabsContent>)
        })}    
    </Tabs>
  );
}

export default ChatTabs;