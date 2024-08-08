import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
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
  const [enableNext, setEnableNext] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  let handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEntries = experienceList.slice();
    newEntries[index][name] = value;
    setExperienceList(newEntries);
    console.log(newEntries);
  }
  let onRichTextChange=(e, name, index)=>{
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  }
  let AddNewExperience =()=>{
    setExperienceList([...experienceList, formField]);
  }
  let RemoveExperience =()=>{
    setExperienceList(experienceList.slice(0, -1));
  }
 
  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience: experienceList });
  }, [experienceList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience </h2>
      <p>Add Your previous Job Experience</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={index}
          >
            <div className="grid grid-cols-2 gap-3 my-5 border p-3 rounded-lg">
            <div>
              <label className="text-xs">Position Title</label>
              <Input name="title" onChange={(e) => handleChange(e, index)}/>
            </div>
            <div>
              <label className="text-xs">Company Name</label>
              <Input name="companyName" onChange={(e) => handleChange(e, index)}/>
            </div>
            <div>
              <label className="text-xs">City</label>
              <Input name="city" onChange={(e) => handleChange(e, index)}/>
            </div>
            <div>
              <label className="text-xs">State</label>
              <Input name="state" onChange={(e) => handleChange(e, index)}/>
            </div>
            <div>
              <label className="text-xs">Start Date</label>
              <Input name="startDate" type="date" onChange={(e) => handleChange(e, index)}/>
            </div>
            <div>
              <label className="text-xs">End Date</label>
              <Input name="endDate" type="date" onChange={(e) => handleChange(e, index)}/>
            </div>
            {/* summery */}
            <div className="col-span-2">
              <RichTextEditor index={index} onRichTextChange={(e) => onRichTextChange(e, "workSummery", index)}/>
            </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
        <Button variant="outline" className='text-primary' onClick={AddNewExperience}>+ Add More Experience</Button>
        <Button variant="outline" disabled={experienceList.length === 1} className='text-primary' onClick={RemoveExperience}>- Remove Experience</Button>
        </div>
        <Button>Save</Button>
      </div>
    </div>
  );
}

export default Experience;
