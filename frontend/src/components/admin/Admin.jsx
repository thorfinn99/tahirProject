import React from 'react'
import Navbar from '../shared/Navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import useGetAllRooms from '@/hooks/useGetAllRooms'

const Admin = () => {
  const navigate = useNavigate()
  useGetAllRooms();
  return (
    <div> 
        <Navbar />
    <div className='flex ml-10 mt-10' >
        <button onClick={()=> navigate('/create/room')} className='text-white px-3 py-1 font-semibold rounded-lg bg-orange-500' >Add New Room</button>
    </div>
    <div className='flex ml-10 mt-10' >
        <button onClick={()=> navigate('/browse/rooms')} className='text-white px-3 py-1 font-semibold rounded-lg bg-orange-500' >Browse All Rooms</button>
    </div>
    <div className='flex ml-10 mt-10' >
        <button onClick={()=> navigate('/manage/bookings')} className='text-white px-3 py-1 font-semibold rounded-lg bg-orange-500' >Manage Bookings</button>
    </div>
    <div className='flex ml-10 mt-10' >
        <button onClick={()=> navigate('/manage/queries')} className='text-white px-3 py-1 font-semibold rounded-lg bg-orange-500' >All Queries</button>
    </div>
    </div>
  )
}

export default Admin