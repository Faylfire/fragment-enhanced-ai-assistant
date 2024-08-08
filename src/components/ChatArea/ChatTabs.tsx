import React from 'react';
//import NavBar from './NavBar';
//import TopicList from './TopicList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatList, ChatMessage, ChatEntry } from '@/types/types';
import { ScrollArea , ScrollBar} from "@/components/ui/scroll-area"



function ChatTabs({chatList, ...props}: {chatList:ChatList}) {

  return (
    <Tabs defaultValue={chatList[0].id} className="w-full h-screen flex flex-col">
         <TabsList className="sticky top-0 z-10 items-center justify-start rounded-none">
            {chatList.map((chat: ChatEntry)=>{
                return <TabsTrigger key={chat.id} value={chat.id}>{chat.chatTitle}</TabsTrigger>
            })}
        </TabsList>
        {chatList.map((chat:ChatEntry)=>{
            return (
              <TabsContent className="h-full" key={`chatContent-${chat.id}`} value={chat.id}>
                <ScrollArea className="h-screen rounded-md border">
                  <div className="pb-[150px] pt-[10px]">
                    {chat.chatContent.map((line:ChatMessage, index:number)=>{
                        return (
                          <div className={`m-2`} key={`${chat.id}-${index}`}>
                            <p className={`px-2 ${line.role!=='user'?'text-right':'text-left'}`}>{`${line.role}`}</p>
                            <p className='p-2 rounded-xl bg-muted'>{`${line.content}`}</p>
                          </div>
                        )
                    })}
                  </div>
                <ScrollBar orientation="vertical" />
                </ScrollArea>
              </TabsContent>
            )
        })}   
    </Tabs>
  );
}

export default ChatTabs;