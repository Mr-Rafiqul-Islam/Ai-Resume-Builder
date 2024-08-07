import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeItem({resume}) {
  return (
    <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
        <div className='p-14 border border-primary flex items-center justify-center h-[280px] rounded-lg cursor-pointer bg-secondary hover:scale-105 transition-all hover:shadow-md'>
            <Notebook/>
        </div>
        <h2 className='text-center capitalize mt-2'>{resume.title}</h2>
    </Link>
  )
}

export default ResumeItem