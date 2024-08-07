import FormSection from "@/components/custom/FormSection";
import ResumePreview from "@/components/custom/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(dummy);
  useEffect(() => {
    // console.log(params.resumeId);
    setResumeInfo(dummy);
  }, []);
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
        {/* form section */}
        <FormSection />
        {/* preview section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
