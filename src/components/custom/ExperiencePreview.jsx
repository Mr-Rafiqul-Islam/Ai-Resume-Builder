import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-sm font-bold mb-2 text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((exp, index) => (
        <div key={index} className="my-4">
          <h2 className="text-sm font-bold"
          style={{ color: resumeInfo?.themeColor }}>{exp?.title}</h2>
          <h2 className="text-xs flex justify-between">{exp?.companyName}, {exp?.city}, {exp?.state}
          <span>{exp?.startDate} - {exp?.currentlyWorking ? "Present" : exp?.endDate}</span>
          </h2>
          <p className="text-xs my-2">{exp?.workSummery}</p>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
