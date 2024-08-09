import React, { useContext, useEffect, useState } from "react";
import SubHeading from "../SubHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Loader2 } from "lucide-react";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Education() {
  const [enableNext, setEnableNext] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  let handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEntries = educationList.slice();
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };
  let AddNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  let RemoveEducation = () => {
    setEducationList(educationList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationList });
  }, [educationList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: { education: educationList },
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
      <SubHeading subTitle="Add Your Education" title="Educational Details" />
      <div>
        {educationList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 my-5 border p-3 rounded-lg">
              <div>
                <label className="text-xs">University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">Degree</label>
                <Input name="degree" onChange={(e) => handleChange(e, index)} />
              </div>
              <div className="col-span-2">
                <label className="text-xs">Major</label>
                <Input name="major" onChange={(e) => handleChange(e, index)} />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs">Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
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
            onClick={AddNewEducation}
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            disabled={educationList.length === 1}
            className="text-primary"
            onClick={RemoveEducation}
          >
            - Remove Education
          </Button>
        </div>
        <Button type="submit" disabled={loading} onClick={onSave}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
