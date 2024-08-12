import React from "react";
//import NavBar from './NavBar';
//import TopicList from './TopicList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//import CollectionCard from './CollectionCard';
import CollectionAccordion from "./CollectionAccordion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FormProvider, useFormContext } from "@/context/FormContext";

function Header() {
  return (
    <FormProvider>
      <Tabs defaultValue="collections" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
        </TabsList>
        <TabsContent className="h-full" value="collections">
          <ScrollArea className="h-screen rounded-md border">
            <div className="pb-[150px]">
              <CollectionAccordion />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="chats">See your chats here</TabsContent>
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
