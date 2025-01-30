import { setBookings } from '@/redux/bookingsSlice';
import { BOOKING_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllBookings = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchAllBookings = async () => {
        try {
          const res = await axios.get(`${BOOKING_API_END_POINT}/get`, { withCredentials: true });
          if (res.data.success) {
            console.log(res);
            dispatch(setBookings(res.data?.bookings));
          }
        } catch (error) {
          console.log("Error fetching Bookings:", error);
        }
      };
      fetchAllBookings();
    }, [dispatch]);
  };
  
  export default useGetAllBookings;