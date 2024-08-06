import { Loader2, PlusSquare } from "lucide-react";
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
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../../service/GlobalApi";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState(false);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  let onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    await GlobalApi.CreateNewResume(data).then(
      (res) => {
        console.log(res);
        if (res) {
          setLoading(false);
        }
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  return (
    <div className="mt-5">
      <div
        className="p-14 border border-dashed flex items-center justify-center h-[280px] rounded-lg cursor-pointer bg-secondary hover:scale-105 transition-all hover:shadow-md"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="mt-2"
                placeholder="Ex. Software Engineer resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button onClick={() => setOpenDialog(false)} variant="destructive">
              Cancel
            </Button>
            <Button onClick={onCreate} disabled={!resumeTitle || loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
