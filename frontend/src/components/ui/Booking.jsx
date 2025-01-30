import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import useGetMyBookings from '@/hooks/useGetMyBookings';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BOOKING_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setRooms } from '@/redux/roomSlice';

const Booking = () => {
  useGetMyBookings();

  const { rooms } = useSelector(store => store.room)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { myBookings } = useSelector((store) => store.booking);
  const [canceledBookings, setCanceledBookings] = useState([]);

  const getStatusClass = (status) => {
    if (status === 'confirmed') {
      return 'text-green-500';
    } else if (status === 'cancelled') {
      return 'text-red-500';
    } else {
      return 'text-yellow-500';
    }
  };

  const handleCancelBooking = async ({ bookingId, roomId }) => {
    try {
      const res = await axios.post(
        `${BOOKING_API_END_POINT}/cancelBooking`,
        { bookingId, roomId },
        { withCredentials: true }
      );
      
      if (res.data.success) {
        setCanceledBookings((prev) => [...prev, bookingId]);
        window.location.reload();
        dispatch(setRooms(""))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Bookings</h1>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {myBookings && myBookings.length > 0 ? (
            myBookings.map((booking) => (
              <div
                key={booking._id}
                className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex flex-col mb-4">
                  <h3 className="font-semibold text-lg mb-2">{booking.room.roomName}</h3>
                  <p className="text-sm text-gray-600 font-medium mb-1">Room Type:</p>
                  <p className="text-sm text-gray-600 mb-3">{booking.room.roomType}</p>

                  <div className="flex gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Check-In:</p>
                      <p className="text-sm text-gray-800">{booking.checkInDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Check-Out:</p>
                      <p className="text-sm text-gray-800">{booking.checkOutDate}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 font-medium mb-2">Amount:</p>
                  <p className="text-sm text-gray-800 mb-2">₹{booking.totalAmount}</p>

                  <p className={`text-sm ${getStatusClass(booking.status)} font-semibold`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </p>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleCancelBooking({ bookingId: booking._id, roomId: booking.room._id })}
                    className={`w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md ${
                      booking.status === 'cancelled' || canceledBookings.includes(booking._id) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={booking.status === 'cancelled' || canceledBookings.includes(booking._id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">No bookings available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
