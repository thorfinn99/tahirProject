import { setAvailableRooms, setRooms, setSearchData } from '@/redux/roomSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ROOM_API_END_POINT } from '@/utils/constant'

const useGetAllRooms = () => {
  const dispatch = useDispatch();
  const { availableRooms } = useSelector((store)=> store.room)


  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const res = await axios.get(`${ROOM_API_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setRooms(res.data.rooms));
          dispatch(setAvailableRooms([]))
        }
      } catch (error) {
        console.log("Error fetching rooms:", error);
      }
    };
    fetchAllRooms();
  }, [dispatch]);
};

export default useGetAllRooms;
