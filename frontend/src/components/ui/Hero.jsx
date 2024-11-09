import { setSearchQuery } from '@/redux/jobSlice';
import { ButtonIcon } from '@radix-ui/react-icons'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'


function Hero() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const searchJobHandler = () => {
      dispatch(setSearchQuery(query))
      navigate("/browse")
  }
  
  return (
    <div>
      <motion.div initial={{opacity:0,y:50}}
                  animate={{opacity:1,y:0}}
                  exit={{opacity:0,y:-50}}
                  transition={{duration:0.4}} class="text-center  " >
        <div className='flex flex-col gap-5 my-10' >
        <span class="mx-auto md:px-4 px-2 py-1 md:py-2 rounded-full bg-gray-100 text-[#F83002] md:text-xl text-sm md:font-medium " >No 1 Job Hunt Website</span>
        <h1 class="md:text-5xl text-4xl font-bold">Search, Apply & <br/> Get Your <span className='text-[#6A38C2]' >Dream Job</span></h1>
        <p className='md:text-1xl mx-10 md:mx-20 md:leading-none leading-tight'>Discover <span className="text-[#6A38C2] font-semibold">endless opportunities</span>, connect with <span className="text-[#F83002] font-semibold">top companies</span>, and step confidently into your future.  Let your skills shine and <span className="text-[#6A38C2] font-semibold">find the role</span> that’s right for you!</p>
        <div className='flex w-[85%] md:w-[52%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 md:mb-5 mx-auto ' >
          <input onChange={(e)=> setQuery(e.target.value)} type="text" placeholder='Find Your Dream Job' className='outline-none p-2 text-1xl border-none w-full' />
          <div onClick={searchJobHandler} className='text-white bg-[#6A38C2] cursor-pointer hover-bg-[#2b1356] p-4 rounded-r-full ' >
          <button><FaSearch className=' ' /></button>
          </div>
        </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero
