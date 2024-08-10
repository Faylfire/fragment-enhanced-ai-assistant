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
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

//className="items-start [&_[data-description]]:hidden"

const options = [
      "character",
      "location",
      "lore",
      "trope",
      "guideline",
      "other"]

const entryOptions = [
  {
    type: "character",
    description: "The main characters within your story world, including antagonists, protagonists, and love interests."
  },
  {
    type: "location",
    description: "The settings where the story takes place, such as cities, towns, or specific environments."
  },
  {
    type: "lore",
    description: "Background information and history that enrich the world-building and give depth to the story."
  },
  {
    type: "trope",
    description: "Common themes or patterns in storytelling that can be used in various ways to engage the audience."
  },
  {
    type: "guideline",
    description: "Rules or tips to help you write effectively, managing plot development and character arcs."
  },
  {
    type: "other",
    description: "Any other elements that may not fit into the standard categories yet are important for the story."
  }
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

export default function EntryForm(){

    return(
        <div
            className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Details
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="type">Topic</Label>
                  <Select>
                    <SelectTrigger
                      id="type"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {entryOptions.map((option)=>{
                        const IconComponent = iconMap[option.type] || Plus;
                        return(
                            <SelectItem value={option.type} key={option.type}>
                                <div className="flex items-start gap-3 text-muted-foreground">
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
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name">Name/Title</Label>
                  <Input id="name" type="text" placeholder="Naming is an art and a powerful magic..." />
                </div>

                  <div className="grid gap-3">
                    <Label htmlFor="tags">Tags</Label>
                    <Input id="tags" type="text" placeholder="Searchable tags" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="alias">Alias</Label>
                    <Input id="alias" type="text" placeholder="Alternate names for prompt highlighting" />
                  </div>

              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Entry Context
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="This is the lace to hold the distillation of your brilliance..."
                    className="min-h-[9.5rem]"
                  />
                </div>
              </fieldset>
              <Button onClick={handleSubmitEntryForm} type="submit">Save changes</Button>
            </form>
          </div>
    )
}

const handleSubmitEntryForm = (e)=>{
   
    e.preventDefault();
    const form = e.target.closest('form');
    if (form) {
      const formDataObject = {};

      // Handle Input components
      form.querySelectorAll('input').forEach(input => {
        formDataObject[input.id] = input.value;
      });

      // Handle custom Select components
      form.querySelectorAll('[id^="react-select-"]').forEach(select => {
        const selectId = select.id.replace('react-select-', '').replace('-input', '');
        formDataObject[selectId] = select.value;
      });

      // Handle Textarea
      const textarea = form.querySelector('textarea');
      if (textarea) {
        formDataObject[textarea.id] = textarea.value;
      }

      console.log(formDataObject);
    } else {
      console.log('No associated form found');
    }
  }

