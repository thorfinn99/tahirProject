import { setBookings, setMyBookings } from '@/redux/bookingsSlice';
import { BOOKING_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetMyBookings = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchMyBookings = async () => {
        try {
          const res = await axios.get(`${BOOKING_API_END_POINT}/get/myBookings`, { withCredentials: true });
          if (res.data.success) {
            console.log(res);
            dispatch(setMyBookings(res.data?.myBookings));
          }
        } catch (error) {
          console.log("Error fetching my Bookings:", error);
        }
      };
      fetchMyBookings();
    }, [dispatch]);
  };
  
  export default useGetMyBookings;