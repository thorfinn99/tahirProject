import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Hero from './ui/Hero'
import CategoryCarousal from './ui/CategoryCarousal'
import LatestJobs from './ui/LatestJobs'
import Footer from './ui/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs()
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  useEffect(()=> {
    if(user?.role === 'recruiter'){
      navigate("/admin/companies")
    }
  })
  return (
    <div>
      <Navbar />
      <Hero />
      <CategoryCarousal />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home
