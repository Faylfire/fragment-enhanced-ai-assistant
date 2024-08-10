import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EntryForm from "@/components/LeftPanel/EntryForm"


export default function EntryDialogOpener() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={()=>console.log('clicked add entry')} aria-label="Add new item" className='bg-background hover:bg-background hover:text-muted-foreground text-foreground font-bold text-2xl p-0'>+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Entry</DialogTitle>
          <DialogDescription>
            Create a new Entry here. Click Save when you are done.
          </DialogDescription>
        </DialogHeader>
            <EntryForm />
        <DialogFooter>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}