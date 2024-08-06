import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="mt-5">
      <div className="p-14 border border-dashed flex items-center justify-center h-[280px] rounded-lg cursor-pointer bg-secondary hover:scale-105 transition-all hover:shadow-md" onClick={() => setOpenDialog(true)}>
        <PlusSquare />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button variant="destructive">Cancel</Button>
            <Button>Create</Button> 
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
