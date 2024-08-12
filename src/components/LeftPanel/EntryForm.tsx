import React, { useState, useEffect } from "react";
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
import { iconMap } from "@/lib/iconMap";
import { capitalizeFirstLetter } from "@/lib/utils";

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

export default function EntryForm({ setOpen, selection }) {
  const { selectedEntry, updateEntryData, addEntryData, typeList } =
    useFormContext();

  const requiredKeys = ["type", "title", "description"];
  function isValidFormData(obj, requiredKeys) {
    if (Object.keys(obj).length === 0) {
      return false; // Object is empty
    }
    return requiredKeys.every((key) => obj.hasOwnProperty(key));
  }

  const handleSubmitEntryForm = (event) => {
    event.preventDefault();

    console.log("formData before adding entry: ", formData);
    if (isValidFormData(formData, requiredKeys)) {
      if (
        formData.type !== "" &&
        formData.title !== "" &&
        formData.description !== ""
      ) {
        addEntryData(formData);
        console.log(formData);
        setOpen(false);
      } else {
        console.log("Empty fields, please fill out the required fields");
      }
    } else {
      console.log("Not valid formData format, nothing done");
    }
  };

  const [formData, setFormData] = useState({
    type: selection,
    title: "",
    tags: [],
    alias: [],
    notes: "",
    description: "",
  });

  useEffect(() => {
    console.log("formData updated: ", formData);
  }, [formData]);

  /*
  useEffect(() => {
    if (selectedEntry) {
      setFormData({ ...selectedEntry.content });
    }
  }, [selectedEntry]); */

  const handleChange = (e) => {
    const { id, value } = e.target;

    console.log(id, "value: ", value);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectValueChange = (value) => {
    console.log(value);
    setFormData((prev) => ({ ...prev, ["type"]: value }));
  };

  //NOTE: Remove const dummyArray = ["a", "bell", "c", "d"];

  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-4">
        <fieldset className="grid gap-4 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Details</legend>
          <div className="grid gap-3">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={handleSelectValueChange}
            >
              <SelectTrigger
                id="type"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a type of entry" />
              </SelectTrigger>
              <SelectContent>
                {entryOptions.map((option) => {
                  const IconComponent = iconMap[option.type] || Triangle;
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
