import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import ResumePreview from "@/components/custom/ResumePreview";
import { RWebShare } from "react-web-share";
import { Loader2 } from "lucide-react";
function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    setLoading(true);
    GlobalApi.GetResumeById(resumeId).then((res) => {
      console.log(res.data.data);
      setResumeInfo(res.data.data);
      setLoading(false);
    });
  };
  const handleDownload = () => {
    window.print();
  };
  const [loading, setLoading] = useState(false);
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-2xl text-center font-medium">
            Congrats ! Your Resume is ready
          </h2>
          <p>Now you can download or share your resume</p>
          <div className="flex gap-4 mt-5">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Here is Your resume link for sharing",
                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName}'s Resume`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="mx-10 md:mx-20 lg:mx-36" id="print-area">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Loader2 className="w-14 h-14 animate-spin" />
          </div>
        ) : (
          <ResumePreview />
        )}      
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
