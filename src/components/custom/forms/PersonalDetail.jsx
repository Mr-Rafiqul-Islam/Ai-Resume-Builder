import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import SubHeading from "../SubHeading";

function PersonalDetail({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(params);
  }, []);
  let handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setResumeInfo({ ...resumeInfo, [name]: value });
  };

  // onsubmit
  let handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Details updated successfully 🎉");
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <SubHeading subTitle="Get Started with your personal details " title="Personal Detail" />
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm" htmlFor="firstName">
              First Name
            </label>
            <Input name="firstName" required onChange={handleInputChange} defaultValue={resumeInfo?.firstName}/>
          </div>
          <div>
            <label className="text-sm" htmlFor="lastName">
              Last Name
            </label>
            <Input name="lastName" required onChange={handleInputChange} defaultValue={resumeInfo?.lastName}/>
          </div>
          <div className="col-span-2">
            <label htmlFor="jobTitle" className="text-sm">
              Job Title{" "}
            </label>
            <Input name="jobTitle" required onChange={handleInputChange} defaultValue={resumeInfo?.jobTitle}/>
          </div>
          <div>
            <label className="text-sm" htmlFor="phone">
              Phone
            </label>
            <Input name="phone" required onChange={handleInputChange} defaultValue={resumeInfo?.phone}/>
          </div>
          <div>
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <Input name="email" required onChange={handleInputChange} defaultValue={resumeInfo?.email}/>
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <Input name="address" required onChange={handleInputChange} defaultValue={resumeInfo?.address}/>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
