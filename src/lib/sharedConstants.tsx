import {
  Bird,
  Book,
  BookOpen,
  Bot,
  MapPin,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  CircleUserRound,
  MessageCircleWarning,
  Ruler,
  FolderClosed,
} from "lucide-react";
import { ChatList, ChatEntry } from "@/types/types";

export const iconMap = {
  character: CircleUserRound,
  location: MapPin,
  lore: BookOpen,
  trope: MessageCircleWarning,
  guideline: Ruler,
  other: FolderClosed,
};

export const entryOptions = [
  {
    type: "character",
    description:
      "The main characters within your story world, including antagonists, protagonists, and love interests.",
  },
  {
    type: "location",
    description:
      "The settings where the story takes place, such as cities, towns, or specific environments.",
  },
  {
    type: "lore",
    description:
      "Background information and history that enrich the world-building and give depth to the story.",
  },
  {
    type: "trope",
    description:
      "Common themes or patterns in storytelling that can be used in various ways to engage the audience.",
  },
  {
    type: "guideline",
    description:
      "Rules or tips to help you write effectively, managing plot development and character arcs.",
  },
  {
    type: "other",
    description:
      "Any other elements that may not fit into the standard categories yet are important for the story.",
  },
];

export const dummyChatsOld: ChatList = [
  {
    chatID: "1",
    id: "1",
    chatTitle: "First Conversation",
    chatContent: [
      { role: "user", content: "Hello, how are you?" },
      {
        role: "assistant",
        content: "I'm doing well, thank you! How can I assist you today?",
      },
    ],
  },
  {
    chatID: "2",
    id: "2",
    chatTitle: "Tech Support",
    chatContent: [
      { role: "system", content: "You are a tech support assistant." },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure it's plugged in...2",
      },
    ],
  },
  {
    chatID: "3",
    id: "3",
    chatTitle: "Tech Support2",
    chatContent: [
      { role: "system", content: "You are a tech support assistant." },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart",
      },
    ],
  },
  {
    chatID: "4",
    id: "4",
    chatTitle: "Chat Overflow",
    chatContent: [
      { role: "system", content: "You are a tech support assistant." },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Each of these locations maintains the structure of the Entry interface while providing unique settings that can enrich your story or game world. You can add these to your existing locationList using the spread operator as shown in the comment at the end of the code snippet.",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart2",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart Let's break down the Tailwind classes and explain the layout: The outermost div uses: flex flex-col: Creates a flexible column layout h-screen: Makes the div take up the full height of the viewport The first inner div (containing ChatTabs and chat bubbles) uses: flex-1: Allows this div to grow and take up all available spaceoverflow-y-auto: Adds a vertical scrollbar if the content overflows",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart1",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart2",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "This approach allows you to dynamically position your 80%-width div to the left or right of the screen based on the flag prop. The outer w-full div ensures that the inner div has the full screen width as its reference for the 80% calculation.",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart1",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart2",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart Let's break down the Tailwind classes and explain the layout: The outermost div uses: flex flex-col: Creates a flexible column layout h-screen: Makes the div take up the full height of the viewport The first inner div (containing ChatTabs and chat bubbles) uses: flex-1: Allows this div to grow and take up all available spaceoverflow-y-auto: Adds a vertical scrollbar if the content overflows",
      },
      {
        role: "user",
        content: "My computer won't turn on. I've tried everything.",
      },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart1",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart2",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Each of these locations maintains the structure of the Entry interface while providing unique settings that can enrich your story or game world. You can add these to your existing locationList using the spread operator as shown in the comment at the end of the code snippet.",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart1",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart2",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart Let's break down the Tailwind classes and explain the layout: The outermost div uses: flex flex-col: Creates a flexible column layout h-screen: Makes the div take up the full height of the viewport The first inner div (containing ChatTabs and chat bubbles) uses: flex-1: Allows this div to grow and take up all available spaceoverflow-y-auto: Adds a vertical scrollbar if the content overflows",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart1",
      },
      { role: "user", content: "My computer won't turn on." },
      {
        role: "assistant",
        content:
          "Let's try some troubleshooting steps. First, make sure to restart2",
      },
    ],
  },
  {
    chatID: "5",
    id: "5",
    chatTitle: "New Chat 5",
    chatContent: [],
  },
];

export const dummyChats: ChatList = [
  {
    chatID: `chat-${Date.now()}`,
    id: `chat-${Date.now()}`,
    chatTitle: "New Chat",
    chatContent: [],
  },
];

export const systemWritingPrompt = `You are an expert fiction writer. 
Always keep the following rules in mind: 
- Write in past tense and use US English spelling, grammar, and colloquialisms/slang. 
- Write in active voice 
- Always follow the "show, don't tell" principle. 
- Avoid adverbs and cliches and overused/commonly used phrases. Ain for fresh and original descriptions. 
- Convey events and story through dialogue when possible.
- Mix short, punchy sentences with long, descriptive ones. Drop fill words to add variety. 
- Skip "he/she said said" dialogue tags and convoy people's actions or face expressions through their speech 
- Avoid mushy dialogue and descriptions, have dialogue always continue the action, never stall or add unnecessary fluff. 
- Vary the descriptions to not repeat yourself. 
- Put dialogue on its own paragraph to separate scene and action. 
- Reduce indicators of uncertainty like 'trying" or "maybe" 

Take into account the following characters/locations/lore/guideline/trope/other...: `;
