import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/context/ChatContext";
import { capitalizeFirstLetter, getFirstSentence } from "@/lib/utils";

export default function CollectionAccordion({ initChatList }) {
  const { chatList, chats } = useChatContext();

  console.log("in Chat Accordion--------", initChatList);
  useEffect(() => {
    console.log("entries changed: ", chatList);
  }, [chatList]);

  return (
    <>
      <Accordion type="multiple" className="w-full">
        {initChatList.map((chat) => {
          return (
            <AccordionItem value={chat.title} key={chat.id} id={chat.id}>
              <div className="flex px-4 bg-primary-foreground">
                <div className="flex flex-grow items-center justify-between pr-2">
                  <div className="font-bold">{`${capitalizeFirstLetter(
                    chat.chatTitle
                  )}`}</div>
                </div>
                <AccordionTrigger className="flex-none"></AccordionTrigger>
              </div>
              <AccordionContent className="p-0">
                {/*test for asides in the chat object if so render them here*/}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
