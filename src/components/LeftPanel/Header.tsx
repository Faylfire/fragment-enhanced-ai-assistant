import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollectionAccordion from "./CollectionAccordion";
import ChatAccordion from "./ChatAccordion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FormProvider } from "@/context/FormContext";
import { ChatProvider } from "@/context/ChatContext";
import { dummyChats } from "@/lib/sharedConstants";

function Header() {
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
