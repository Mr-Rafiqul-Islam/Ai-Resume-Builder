import React from 'react'
import { Link } from 'react-router-dom'

function ResumeItem({resume}) {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className='p-14 border border-primary flex items-center justify-center h-[280px] rounded-lg cursor-pointer bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 border-t-4 hover:scale-105 transition-all hover:shadow-md' style={{borderColor: resume?.themeColor}}>
            <img src="/cv.png" alt="cv" width={150} height={150}/>
        </div>
        <h2 className='text-center capitalize mt-2'>{resume.title}</h2>
    </Link>
  )
}

export default ResumeItem