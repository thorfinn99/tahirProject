import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Room from './Room';
import Navbar from '../shared/Navbar';

const Rooms = () => {
  const [roomType, setRoomType] = useState("All");
  const { rooms } = useSelector((store) => store.room); // Access rooms from Redux

  // Filter rooms based on roomType
  const filteredRooms =
    roomType === "All"
      ? rooms
      : rooms.filter((room) => room.roomType === roomType);

  return (
    <div>
      <Navbar />
      <div className="mt-8">
        <h1 className="text-4xl font-bold m-6">All The Listed Rooms</h1>
        <div className="w-full overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide mx-6">
            <div className="flex gap-7 mx-auto md:justify-center sm:justify-start">
              {["All", "single", "double", "family"].map((type, index) => (
                <div
                  onClick={() => setRoomType((prev) => (prev === type ? "All" : type))}
                  className="flex cursor-pointer flex-col min-w-[120px] items-center"
                  key={index}
                >
                  <p
                    className={`font-semibold text-gray-500 my-1 ${
                      roomType === type ? "text-orange-500" : ""
                    }`}
                  >
                    {type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="m-5 border-t-4 text-black " />
        <h1 className="font-bold mx-5 text-3xl my-7">Available Rooms</h1>
        <div className="grid mx-5 cursor-pointer grid-cols-1 sm:grid-cols-2 max-w-5xl md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room, index) => (
            <Room room={room} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
