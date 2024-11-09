import React from 'react'
import { useNavigate } from 'react-router-dom'

function LatestJobsCards({job}) {
  const navigate = useNavigate()
  return (
    <div onClick={()=>  navigate(`/description/${job._id}`)} className='shadow-lg md:p-5 p-3 md:mx-1 mx-3  md:my-4' >
      <h2 className='font-semibold' >{job?.company?.name}</h2>
      <p className='font-light' >{job?.location}</p>
      <h1 className='font-bold' >{job?.title}</h1>
      <p className='leading-tight my-3 ' >{job?.description}</p>
      <div className='flex items-center gap-2 md:gap-5  ' >
        <p className='text-blue-500 text-sm font-medium rounded-lg px-2 md:px-2 md:py-1 border-[1px] hover:bg-blue-400 hover:text-white border-gray-300 ' >{job?.positions}</p>
        <p className='text-red-400 text-sm font-medium rounded-lg px-2 md:px-2 md:py-1  border-[1px] hover:bg-red-400 hover:text-white border-gray-300 ' >{job?.jobType}</p>
        <p className='text-green-400 text-sm font-medium rounded-lg md:px-2 md:py-1 px-2 border-[1px] hover:bg-green-400 hover:text-white border-gray-300 ' >{job?.salary}lpa</p>
      </div>
    </div>
  )
}

export default LatestJobsCards
