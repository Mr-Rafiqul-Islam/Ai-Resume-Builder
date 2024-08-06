import AddResume from '@/components/custom/AddResume'
import React from 'react'

function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-32'>
        <h1 className='text-3xl font-bold'>My Resume</h1>
        <p>Start building AI resume for your next job role.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <AddResume/>
        </div>
    </div>
  )
}

export default Dashboard