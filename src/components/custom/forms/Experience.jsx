import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import SubHeading from "../SubHeading";
import { Loader2 } from "lucide-react";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};
function Experience() {
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

 
  let handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEntries = experienceList.slice();
    newEntries[index][name] = value;
    setExperienceList(newEntries);
    console.log(newEntries);
  };
  let onRichTextChange = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };
  let AddNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };
  let RemoveExperience = () => {
    setExperienceList(experienceList.slice(0, -1));
  };
  useEffect(() => {
   resumeInfo && setExperienceList(resumeInfo.experience);
 },[])
  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience: experienceList });
  }, [experienceList]);
  const onSave = () => {
    setLoading(true);
    const data = {
      data: { experience: experienceList.map(({id, ...rest})=>rest) },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details updated successfully 🎉");
      },
      (err) => {
        console.log(err);
        setLoading(false);
        toast("Server Error 😥 please try again..!");
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <SubHeading
        subTitle="Add Your previous Job Experience"
        title="Professional Experience"
      />
      <div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 my-5 border p-3 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input name="title" defaultValue={item.title} onChange={(e) => handleChange(e, index)} />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  defaultValue={item.companyName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input name="city" defaultValue={item.city} onChange={(e) => handleChange(e, index)} />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input name="state" defaultValue={item.state} onChange={(e) => handleChange(e, index)} />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  name="startDate"
                  defaultValue={item.startDate}
                  type="date"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  name="endDate"
                  defaultValue={item.endDate}
                  type="date"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              {/* summery */}
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={item.workSummery}
                  onRichTextChange={(e) =>
                    onRichTextChange(e, "workSummery", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="text-primary"
            onClick={AddNewExperience}
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            disabled={experienceList.length === 1}
            className="text-primary"
            onClick={RemoveExperience}
          >
            - Remove Experience
          </Button>
        </div>
        <Button type="submit" disabled={loading} onClick={onSave}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
