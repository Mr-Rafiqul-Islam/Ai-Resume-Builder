import React, { useContext, useEffect, useState } from "react";
import SubHeading from "../SubHeading";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GlobalApi from "../../../../service/GlobalApi";


function Skills() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  let handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
    console.log(newEntries);
  };

  let AddMoreSkills = () => {
    setSkillsList([...skillsList, { name: "", rating: 0 }]);
  };
  let RemoveSkills = () => { 
    setSkillsList(skillsList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, skills: skillsList });
  }, [skillsList]);
  const onSave = () => {
    setLoading(true);
    const data = {
      data: { skills: skillsList },
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
        title={"Skills"}
        subTitle={"Add Your Top Professional key Skills"}
      />
      <div>
        {skillsList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-5 my-5 border p-3 rounded-lg">
              <div className="">
                <label className="text-xs">Name</label>
                <Input
                  name="name"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs">Rating</label>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={item.rating}
                  halfFillMode="box"
                  onChange={(value) => handleChange(index, "rating", value)}
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
            onClick={AddMoreSkills}
          >
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            disabled={skillsList.length === 1}
            className="text-primary"
            onClick={RemoveSkills}
          >
            - Remove Skills
          </Button>
        </div>
        <Button type="submit" disabled={loading} onClick={onSave}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </Button>
      </div>
    </div>
  );
}

export default Skills;
