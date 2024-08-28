import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { useFormContext } from "@/context/FormContext";
import { Entry, EntryPlusID } from "@/types/types";
import { iconMap, entryOptions } from "@/lib/sharedConstants";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function UpdateForm({ setOpen, entryContent, entryID }) {
  const { updateEntryData } = useFormContext();

  const requiredKeys = ["type", "title", "description"];
  function isValidFormData(obj, requiredKeys) {
    if (Object.keys(obj).length === 0) {
      return false; // Object is empty
    }
    return requiredKeys.every((key) => obj.hasOwnProperty(key));
  }

  const handleUpdateForm = (event) => {
    event.preventDefault();

    console.log("formData before Updating entry: ", entryID, formData);
    //validate formData is the correct format before updating
    if (isValidFormData(formData, requiredKeys)) {
      if (
        formData.type !== "" &&
        formData.title !== "" &&
        formData.description !== ""
      ) {
        updateEntryData(entryID, formData);
        console.log(entryID, formData);
        setOpen(false);
      } else {
        console.log("Empty fields, please fill out the required fields");
      }
    } else {
      console.log("Not valid formData format, nothing done");
    }
  };

  const [formData, setFormData] = useState(entryContent);

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
        <Button onClick={handleUpdateForm} type="submit">
          Update Entry
        </Button>
      </form>
    </div>
  );
}
