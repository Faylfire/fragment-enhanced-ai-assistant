import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import UpdateForm from "@/components/LeftPanel/UpdateForm";

export default function EntryDialogOpener({
  className = "",
  children,
  entryContent,
  entryID,
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Entry</DialogTitle>
          <DialogDescription>
            Make changes here. Click Update when you are done.
          </DialogDescription>
        </DialogHeader>
        <UpdateForm
          setOpen={setOpen}
          entryContent={entryContent}
          entryID={entryID}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
