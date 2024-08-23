import React from "react";
//import NavBar from './NavBar';
//import TopicList from './TopicList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//import CollectionCard from './CollectionCard';
import CollectionAccordion from "./CollectionAccordion";
import ChatAccordion from "./ChatAccordion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FormProvider } from "@/context/FormContext";
import { ChatProvider } from "@/context/ChatContext";
import { dummyChats } from "@/lib/sharedConstants";

function Header() {
  //NOTE: Clean up this longArray, this is for visualization and will be removed
  const longArray = new Array(100).fill(0);
  return (
    <FormProvider>
      <Tabs defaultValue="collections" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-1">
          <TabsTrigger value="collections" className="hover:bg-highlight">
            Collections
          </TabsTrigger>
          <TabsTrigger value="chats" className="hover:bg-highlight">
            Chats
          </TabsTrigger>
        </TabsList>
        <TabsContent className="h-full" value="collections">
          <ScrollArea className="h-screen rounded-md border">
            <div className="pb-[150px]">
              <CollectionAccordion />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </TabsContent>
        <ChatProvider>
          <TabsContent className="h-full" value="chats">
            <ScrollArea className="h-screen rounded-md border">
              <div className="pb-[150px]">
                <ChatAccordion initChatList={dummyChats} />
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </TabsContent>
        </ChatProvider>
      </Tabs>
    </FormProvider>
  );
}

export default Header;

/*
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
                */
