import FormSection from "@/components/custom/FormSection";
import ResumePreview from "@/components/custom/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { Loader2 } from "lucide-react";

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log(params.resumeId);
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    setLoading(true);
    GlobalApi.GetResumeById(params.resumeId).then((res) => {
      console.log(res.data.data);
      setResumeInfo(res.data.data);
      setLoading(false);
    });
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader2 className="w-14 h-14 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
          {/* form section */}
          <FormSection />
          {/* preview section */}
          <ResumePreview />
        </div>
      )}
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
