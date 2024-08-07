import React, { useContext } from "react";
import PersonalDetailPreview from "./PersonalDetailPreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import SummeryPreview from "./SummeryPreview";
import ExperiencePreview from "./ExperiencePreview";
import EducationPreview from "./EducationPreview";
import SkillsPreview from "./SkillsPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]" style={{borderColor: resumeInfo?.themeColor}}>
      {/* personal details  */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
      {/* summery */}
        <SummeryPreview resumeInfo={resumeInfo}/>
      {/* work experience */}
        <ExperiencePreview resumeInfo={resumeInfo}/>
      {/* education */}
        <EducationPreview resumeInfo={resumeInfo}/>
      {/* skills */}
      <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  );
}

export default ResumePreview;
