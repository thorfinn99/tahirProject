import React from 'react'
import LatestJobsCards from './LatestJobsCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LatestJobs() {
  const {allJobs} = useSelector(store => store.job)
 
  return (
    <div className='max-w-7xl md:text-xl text-1xl mx-auto my-10 md:my-20 ' >
      <h1 className='md:text-4xl mx-4 md:mx-0 text-3xl font-bold' > <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-5  ' >
          {
             allJobs.length <= 0 ? <span>No Jobs Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobsCards  key={job._id} job={job} /> )
          }</div>
    </div>
  )
}

export default LatestJobs
