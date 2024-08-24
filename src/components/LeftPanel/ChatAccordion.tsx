import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/context/ChatContext";
import { capitalizeFirstLetter, getFirstSentence } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";

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
              <div className="flex px-4 bg-primary-foreground">
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
                {chat.hasOwnProperty("aside") && (
                  <AccordionTrigger className="flex-none"></AccordionTrigger>
                )}
              </div>
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
