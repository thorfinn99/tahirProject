import { setAvailableRooms, setSearchData } from '@/redux/roomSlice';
import { ROOM_API_END_POINT } from '@/utils/constant';
import { useSelect } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BookRoom = () => {
  const { availableRooms } = useSelector((store)=> store.room)
  // State for form inputs
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
  });

  // State for loading
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const payload = {
      roomType: formData.roomType,
      startDate: formData.checkInDate, // Map `checkInDate` to `startDate`
      endDate: formData.checkOutDate,  // Map `checkOutDate` to `endDate`
    };

    try {
      const res = await axios.post(
        `${ROOM_API_END_POINT}/check`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, // If required for cookies/auth
        }
      );
      console.log('Available Rooms:', res.data.availableRooms);
      dispatch(setAvailableRooms(res.data.availableRooms))
      dispatch(setSearchData({
        roomType: formData.roomType,
        startDate: formData.checkInDate,
        endDate: formData.checkOutDate
      }))
      
    } catch (error) {
      console.error('Error:', error.response || error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Check Room Availability</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in Date</label>
          <input
            type="date"
            id="checkIn"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out Date</label>
          <input
            type="date"
            id="checkOut"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Room Type</label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="family">Family</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold rounded-md ${
              loading
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Check Availability'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookRoom;
