import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div>
        <h2
        className="text-sm font-bold mb-2 text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs font-bold">{skill?.name}</h2>
            <div className="h-2 w-[120px] bg-gray-200 rounded-full">
                <div className='h-2 rounded-full' style={{width: `${skill?.rating*20}%`, backgroundColor: resumeInfo?.themeColor}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview