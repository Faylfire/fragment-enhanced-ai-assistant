import React, { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormContext } from "@/context/FormContext";
import { Entry, EntryPlusID } from "@/types/types";

//className="items-start [&_[data-description]]:hidden"

const options = [
  "character",
  "location",
  "lore",
  "trope",
  "guideline",
  "other",
];

const entryOptions = [
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

const iconMap = {
  character: CircleUserRound,
  location: MapPin,
  lore: BookOpen,
  trope: MessageCircleWarning,
  guideline: Ruler,
  other: FolderClosed,
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function EntryForm() {
  /*
  const [selectedTopic, setSelectedTopic] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [alias, setAlias] = useState("");
  const [description, setDescription] = useState("");
  */

  const handleSubmitEntryForm = (event) => {
    event.preventDefault();

    /*
    {
      id: "char1",
      content: {
        collectionType: "character",
        title: "Elara Moonwhisper",
        tags: ["protagonist", "elf", "mage"],
        aliases: ["The Starlight Sorceress", "Lady of the Silver Grove"],
        description: "A wise and powerful elven mage with silvery hair and eyes that sparkle like starlight. Elara is known for her mastery of celestial magic and her deep connection to the natural world.",
        notes: "Elara's staff, the Moonbeam Scepter, is a family heirloom passed down through generations of her lineage.",
        additions: [
          { type: "quote", content: "Magic flows through all things. We need only learn to listen." }
        ]
      }
    }
  */
    addEntryData(formData);
    console.log(formData);
  };

  const { selectedEntry, updateEntryData, addEntryData } = useFormContext();
  const [formData, setFormData] = useState<Entry>({
    type: "",
    title: "",
    tags: [],
    alias: [],
    notes: "",
    description: "",
  });

  useEffect(() => {
    if (selectedEntry) {
      setFormData({ ...selectedEntry.entry });
    }
  }, [selectedEntry]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    console.log(id, "value: ", value);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectValueChange = (value) => {
    console.log(value);
    setFormData((prev) => ({ ...prev, ["type"]: value }));
  };

  const dummyArray = ["a", "bell", "c", "d"];

  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-4">
        <fieldset className="grid gap-4 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Details</legend>
          <div className="grid gap-3">
            <Label htmlFor="type">Topic</Label>
            <Select
              value={formData.type}
              onValueChange={handleSelectValueChange}
            >
              <SelectTrigger
                id="type"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {entryOptions.map((option) => {
                  const IconComponent = iconMap[option.type] || Plus;
                  return (
                    <SelectItem value={option.type} key={option.type}>
                      <div className="flex max-w-[425px] items-start gap-3 text-muted-foreground">
                        <IconComponent className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            <span className="font-medium text-foreground">
                              {capitalizeFirstLetter(option.type)}
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="title">Name/Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Naming is an art and a powerful magic..."
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              type="text"
              placeholder="Searchable tags (separate with commas)"
              value={
                Array.isArray(formData.tags)
                  ? formData.tags.join(", ")
                  : formData.tags
              }
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="alias">Alias</Label>
            <Input
              id="alias"
              type="text"
              placeholder="Alternate names (separate with commas)"
              value={
                Array.isArray(formData.alias)
                  ? formData.alias.join(", ")
                  : formData.alias
              }
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="This is the lace to hold the distillation of your brilliance..."
              className="min-h-[16.5rem]"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <Button onClick={handleSubmitEntryForm} type="submit">
          Save changes
        </Button>
      </form>
    </div>
  );
}
