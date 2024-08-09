import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import { AiChatSession } from "../../../../service/AiModal";
import SubHeading from "../SubHeading";

function Summery() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGenSummeryList, setAiGenSummeryList] = useState([]);
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

  // for AI prompt
  const prompt = `just only depends on ${resumeInfo?.jobTitle}(this job title) give me list of summery for 3 experience level, Mid Level and Freasher level in 4-5 lines in array format, With summery and experience_level Field in JSON Format uniquely for everytime`;
  let GenerateSummeryFromAi = async () => {
    setLoading(true);
    console.log(prompt);
    const result = await AiChatSession.sendMessage(prompt);
    console.log(JSON.parse(result.response.text()));
    setAiGenSummeryList(JSON.parse(result.response.text()));
    setLoading(false);
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <SubHeading subTitle="Add Summery for your Job Title" title="Summery" />
      <form className="mt-5" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summery</label>
          <Button
            size="sm"
            type="button"
            variant="outline"
            className="border-primary text-primary flex gap-2 items-center"
            onClick={GenerateSummeryFromAi}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <Brain className="w-4 h-4" />
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

      {/* for AI suggestions*/}
      {aiGenSummeryList.length > 0 && (
        <div>
          <h2 className="font-bold text-lg">Suggestions from AI</h2>
          {aiGenSummeryList.map((item, i) => (
            <div key={i} className="my-2">
              <h2>Level: {item.experience_level} </h2>
              <p className="text-xs">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
