import { Loader2, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import GlobalApi from "../../../service/GlobalApi";

function ResumeItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then((res) => {
      console.log(res);
      toast("Resume deleted successfully 🎉");
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }, (err) => {
      console.log(err);
      toast("Server Error 😥 please try again..!");
      setLoading(false);
      setOpenAlert(false);
    });
  }
  return (
    <div className="transition-all hover:shadow-md hover:scale-105 rounded-lg">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-14 border-primary flex items-center justify-center h-[280px] rounded-t-lg cursor-pointer bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 border-t-4"
          style={{ borderColor: resume?.themeColor }}
        >
          <img src="/cv.png" alt="cv" width={150} height={150} />
        </div>
      </Link>
      <div
        className="p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{ backgroundColor: resume?.themeColor }}
      >
        <h2 className="text-center text-xs capitalize">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert} >
          
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeItem;
