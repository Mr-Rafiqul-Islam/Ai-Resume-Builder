import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";

function Summery() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    summery && setResumeInfo({ ...resumeInfo, summery: summery });
  }, [summery]);
  let onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: { summery: summery },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast(" updated successfully 🎉");
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summery </h2>
      <p>Add Summery for your Job Title</p>
      <form className="mt-5" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summery</label>
          <Button
            size="sm"
            type="button"
            variant="outline"
            className="border-primary text-primary flex gap-2 items-center"
          >
            <Brain className="w-4 h-4"/>
            Generate with AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          required
          name="summery"
          defaultValue={resumeInfo?.summery}
          onChange={(e) => setSummery(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Summery;
