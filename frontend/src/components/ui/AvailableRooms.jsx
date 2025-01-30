import { BOOKING_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "antd/dist/reset.css";
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import { setSearchData } from '@/redux/roomSlice';
import Navbar from '../shared/Navbar';

const AvailableRooms = () => {
  const { rooms } = useSelector((store) => store.room);
  const [tempRooms, setTempRooms] = useState(rooms);
  const { user } = useSelector((store) => store.auth);
  const { searchData } = useSelector((store) => store.room);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterByRoomType, setFilterByRoomType] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle room booking
  const bookRoom = async (room) => {
    const payload = {
      roomId: room._id,
      userId: user.id,
      startDate: searchData.startDate,
      endDate: searchData.endDate,
    };
    try {
      const res = await axios.post(`${BOOKING_API_END_POINT}/create/request`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        alert("Booking request submitted successfully!");
        navigate('/success');
      } else {
        alert(res.data.message || "Failed to book the room.");
      }
    } catch (error) {
      alert("Failed to submit booking request.");
    }
  };

  // Navigate to room details page
  const viewDetails = (room) => {
    navigate('/room/details', { state: { room } });
  };

  // Filter rooms by date range
  const filterByDate = (dates) => {
    const startDate = dates[0];
    const endDate = dates[1];

    if (!startDate.isValid() || !endDate.isValid()) {
      console.log("Invalid Date Range");
      return;
    }

    console.log("Selected Date Range:", startDate.format('DD-MM-YYYY'), "to", endDate.format('DD-MM-YYYY'));

    dispatch(setSearchData({ startDate: startDate.format('DD-MM-YYYY'), endDate: endDate.format('DD-MM-YYYY') }));

    const filteredRooms = rooms.filter((room) => {
      if (room.currentBookings.length === 0) {
        return true;
      }

      const isAvailable = room.currentBookings.every((booking) => {
        const bookingStart = moment(booking.checkInDate, 'DD-MM-YYYY');
        const bookingEnd = moment(booking.checkOutDate, 'DD-MM-YYYY');

        return endDate.isBefore(bookingStart, 'day') || startDate.isAfter(bookingEnd, 'day');
      });

      return isAvailable;
    });

    setTempRooms(filteredRooms);
  };

  // Handle search query change
  const handleSearchQueryChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    console.log("Search Query:", query);

    const filteredRooms = rooms.filter((room) => 
      room.roomName.toLowerCase().includes(query)
    );

    setTempRooms(filteredRooms);
  };

  // Handle room type dropdown change
  const handleRoomTypeChange = (e) => {
    const selectedType = e.target.value;
    setFilterByRoomType(selectedType);

    console.log("Selected Room Type:", selectedType);

    let filteredRooms = rooms;

    if (selectedType !== "all") {
      filteredRooms = rooms.filter((room) => room.roomType.toLowerCase() === selectedType);
    }

    setTempRooms(filteredRooms);
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 pl-5 pr-5">
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          {/* Date Range Picker */}
          <RangePicker
            format="DD-MM-YYYY"
            allowEmpty={[false, false]}
            onChange={filterByDate}
            className="w-full sm:w-auto"
          />

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
          />

          {/* Room Type Dropdown */}
          <select
            value={filterByRoomType}
            onChange={handleRoomTypeChange}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
          >
            <option value="all">All</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="family">Family</option>
          </select>
        </div>

        {/* Available Rooms */}
        <h2 className="text-xl mt-10 font-bold mb-6">Available Rooms ({tempRooms?.length || 0})</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tempRooms?.length > 0 ? (
            tempRooms.map((room) => (
              <div
                key={room._id}
                className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <img
                  src={room.roomImage}
                  alt={room.roomName}
                  className="w-full h-40 object-cover rounded mb-3"
                />

                <div>
                  <h3 className="font-semibold text-lg mb-1">{room.roomName}</h3>
                  <p className="text-sm text-gray-600 mb-2">{room.roomDescription}</p>
                  <p className="text-sm text-gray-600 mb-2">{room.roomType}</p>
                  <p className="text-sm font-medium text-gray-800">
                    Rent Per Day: <span className="text-blue-600 mt-2"> ₹{room.roomRent}</span>
                  </p>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => viewDetails(room)}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded-lg font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No rooms available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableRooms;
