import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { BOOKING_API_END_POINT } from "@/utils/constant";
import { setSearchData } from "@/redux/roomSlice";
import { toast } from "sonner";
import { useState } from "react";

const RoomDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { room } = state || {}; // Fallback to empty object if room is not found
  const { user } = useSelector((store) => store.auth);
  const { searchData } = useSelector((store) => store.room);
  const dispatch = useDispatch();

  const singleMeal = 80; // Single meal charge per day
  const [includeMeals, setIncludeMeals] = useState(false); // State for meal selection
  let foodAmount = 0;

  // Check if room exists
  if (!room) {
    return (
      <div className="text-center mt-8 text-red-500">
        Room details not found.
      </div>
    );
  }

  const { roomImage, roomName = "Room Name Not Available", roomType = "Room Type Not Available" } = room;

  // Ensure valid start and end date for booking calculation
  const startDate = moment(searchData.startDate, "DD-MM-YYYY");
  const endDate = moment(searchData.endDate, "DD-MM-YYYY");
  
  // Check if valid date range is provided
  if (!startDate.isValid() || !endDate.isValid()) {
    return (
      <div className="text-center mt-8 text-red-500">
        Invalid Date Range for Booking
      </div>
    );
  }

  const totalDays = moment.duration(endDate.diff(startDate)).asDays() + 1;

  // Only calculate foodAmount if meals are included
  if (includeMeals) {
    foodAmount = totalDays * singleMeal * 2; // Total food charge calculation (2 meals per day)
  }

  const totalAmount = room.roomRent * totalDays + foodAmount;

  const bookRoom = async () => {
    const bookingDetails = {
      roomId: room._id,
      userId: user.id,
      checkInDate: startDate,
      checkOutDate: endDate,
      totalAmount,
      totalDays,
    };

    try {
      const res = await axios.post(
        `${BOOKING_API_END_POINT}/bookRoom`,
        bookingDetails,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setSearchData({ startDate: "", endDate: "" }));
        toast.success("Room Booked Successfully");
        navigate('/myBookings');
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to book room.");
    }
  };

  const goBack = () => {
    navigate(-1);
    dispatch(setSearchData({ startDate: "", endDate: "" }));
  };

  return (
    <>
      <Navbar />
      <div className="p-6 flex flex-col items-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-4xl mb-6">
          <img
            src={roomImage}
            alt={roomName}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{roomName}</h1>
            <h2 className="text-lg text-gray-500 italic mb-4">Room Type: {roomType}</h2>
          </div>

          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Booking Details</h3>
          <hr className="my-6 border-gray-300" />
          <div className="mb-6">
            <p className="text-sm text-gray-800 mb-2"><span className="font-medium">User Name:</span> {user?.fullName || "Guest"}</p>
            <p className="text-sm text-gray-800 mb-2"><span className="font-medium">From Date:</span> {searchData.startDate}</p>
            <p className="text-sm text-gray-800 mb-2"><span className="font-medium">To Date:</span> {searchData.endDate}</p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Amount</h3>
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Total Days: {totalDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Rent Per Day: ₹{room.roomRent}</span>
            </div>
            {includeMeals && (
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Food Charge Per Day: ₹{singleMeal * 2}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Room Rent Total: ₹{room.roomRent * totalDays}</span>
            </div>
            {includeMeals && (
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Food Charges Total: ₹{foodAmount}</span>
              </div>
            )}
            <div className="flex gap-4 font-semibold text-lg">
              <span className="text-gray-900">Total Amount:</span>
              <span className="text-gray-900">₹{totalAmount}</span>
            </div>
          </div>

          {/* Include Meals Toggle Section */}
          <div className="mb-6">
            <label className="text-lg text-gray-700">Include Meals?</label>
            <div className="flex items-center mt-2">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={includeMeals}
                  onChange={() => setIncludeMeals(!includeMeals)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <p className="text-gray-500 text-sm mt-2">{includeMeals ? "Meals Included" : "Meals Not Included"}</p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={goBack}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Go Back
            </button>

            {!searchData.startDate || !searchData.endDate ? (
              <p className="text-gray-500 mt-2 italic">Please select the Date to book</p>
            ) : user?.role === "guest" ? (
              <button
                onClick={bookRoom}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Book Room
              </button>
            ) : (
              <p className="text-gray-500 mt-2 italic">Please Login To Book</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
