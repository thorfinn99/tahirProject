import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'


function Browse() {
  useGetAllJobs()
  const {allJobs} = useSelector(store=>store.job)
  const dispatch = useDispatch()
  useEffect(()=> {
    return ()=> {
      dispatch(setSearchQuery(""))
    }
  })

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl md:mx-10 mx-auto my-10' >
        <h1 className='mb-5 text-2xl font-bold ' >Seach Results - ({allJobs.length}) </h1>
        <div className='grid grid-cols-3 gap-4' >
        {
            allJobs.map((job)=> {
                return (
                    <Job key={job._id} job={job} />
                )
            })
        }
        </div>
      </div>
    </div>
  )
}

export default Browse
