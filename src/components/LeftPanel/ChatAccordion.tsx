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
import { Trash2Icon, MessageSquareText } from "lucide-react";

export default function CollectionAccordion({ initChatList }) {
  const { chatList, removeChat } = useChatContext();

  console.log("in Chat Accordion--------", initChatList);
  useEffect(() => {
    console.log("entries changed: ", chatList);
  }, [chatList]);

  return (
    <>
      <Accordion type="multiple" className="w-full">
        {chatList.map((chat) => {
          const deleteChat = () => {
            removeChat(chat.id);
          };
          return (
            <AccordionItem value={chat.chatTitle} key={chat.id} id={chat.id}>
              <div
                id={chat.id}
                className="flex items-center justify-around gap-4 hover:bg-highlight px-4 py-2 m-[1px] rounded-lg cursor-pointer"
              >
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage
                    src={chat.avatar ? chat.avatar : "/avatars/01.png"}
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    <MessageSquareText className="size-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{`${capitalizeFirstLetter(
                    chat.chatTitle
                  )}`}</p>
                  <p className="text-sm text-muted-foreground">
                    {getFirstSentence(chat.chatContent[0].content)}
                  </p>
                </div>
                <Button
                  onClick={deleteChat}
                  aria-label="Add new entry"
                  className="bg-background hover:bg-background hover:text-muted-foreground text-foreground font-bold text-2xl p-0 bg-primary-foreground"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
              {chat.hasOwnProperty("aside") && (
                <AccordionTrigger className="flex-none"></AccordionTrigger>
              )}
              <AccordionContent
                className="p-0"
                key={`AccordionContent-${chat.id}`}
              >
                {/*test for asides in the chat object if so render them here*/}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}

/*
<div className="flex flex-grow items-center justify-between pr-2">
                  <div className="font-bold">{`${capitalizeFirstLetter(
                    chat.chatTitle
                  )}`}</div>
                  <div>
                    {chat.chatContent[0]?.content
                      ? chat.chatContent[0].content
                      : ""}
                  </div>
                  <Button
                    onClick={deleteChat}
                    aria-label="Add new entry"
                    className="bg-background hover:bg-background hover:text-muted-foreground text-foreground font-bold text-2xl p-0 bg-primary-foreground"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
                */
