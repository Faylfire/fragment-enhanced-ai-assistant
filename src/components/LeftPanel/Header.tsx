import React from 'react';
//import NavBar from './NavBar';
//import TopicList from './TopicList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Header() {
  return (
    <Tabs defaultValue="collection" className="w-full">
         <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="collection">Collection</TabsTrigger>
            <TabsTrigger  value="chats">Chats</TabsTrigger>
        </TabsList>
        <TabsContent value="collection">Add fragments to your collection</TabsContent>
        <TabsContent value="chats">See your chats here</TabsContent>
    </Tabs>
  );
}

export default Header;