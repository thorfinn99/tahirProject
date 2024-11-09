import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setFilterWord } from '@/redux/companySlice'

function Companies() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useGetAllCompanies()
  const [input, setInput] = useState("")
  useEffect(()=> {
    dispatch(setFilterWord(input))
  },[input])

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10' >
        <div className='flex items-center justify-between' >
            <input onChange={(e)=> {setInput(e.target.value)} } className='w-fit border-[1px] rounded-lg px-2 py-2 ' placeholder='Fiter by name' type="text" />
            <button onClick={()=> navigate("/admin/companies/create")} className='text-white bg-black px-3 py-2 rounded-xl font-bold' >New Company</button>
        </div>
          <CompaniesTable input={input} />
      </div>
    </div>
  )
}

export default Companies
