import AddResume from "@/components/custom/AddResume";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../service/GlobalApi";
import ResumeItem from "@/components/custom/ResumeItem";
import { LoaderCircle } from "lucide-react";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  //   for getting the list of users resumes
  const GetResumesList = () => {
    setLoading(true);
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        setResumeList(res.data.data);
        setLoading(false);
      },(err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="text-3xl font-bold">My Resume</h1>
      <p>Start building AI resume for your next job role.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
        <AddResume />
        {loading ? (
          <div className="flex justify-center items-center">
            <LoaderCircle className="animate-spin w-10 h-10"/>
          </div>
        ) : (
          resumeList?.map((resume, index) => (
            <ResumeItem key={index} resume={resume} refreshData={GetResumesList}/>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
