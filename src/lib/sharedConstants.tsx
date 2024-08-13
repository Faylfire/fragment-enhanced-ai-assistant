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
