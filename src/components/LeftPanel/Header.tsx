import React from 'react';
//import NavBar from './NavBar';
//import TopicList from './TopicList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CollectionCard from './CollectionCard';

function Header() {
  return (
    <Tabs defaultValue="collections" className="w-full">
         <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger  value="chats">Chats</TabsTrigger>
        </TabsList>
        <TabsContent value="collections">
          <CollectionCard />
        </TabsContent>
        <TabsContent value="chats">See your chats here</TabsContent>
    </Tabs>
  );
}

export default Header;