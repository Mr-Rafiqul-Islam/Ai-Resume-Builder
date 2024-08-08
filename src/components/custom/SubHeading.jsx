import React from 'react'

function SubHeading({subTitle,title}) {
  return (
    <div>
        <h2 className="font-bold text-lg">{title}</h2>
        <p>{subTitle}</p>
    </div>
  )
}

export default SubHeading