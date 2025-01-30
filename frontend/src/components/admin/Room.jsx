import React from 'react';
import { useNavigate } from 'react-router-dom';

const Room = ({ room }) => {
  const { roomType, roomImage, roomName } = room;
  const navigate = useNavigate();

  // Function to handle room detail navigation
  const viewDetails = () => {
    navigate('/room-detail', { state: { room } });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={roomImage}
        alt={`${roomType} Room`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 capitalize">{roomName}</h2>
        <p className="text-gray-500 mt-2">{roomType} Room</p>

        <div className="mt-4 flex justify-center">
        </div>
      </div>
    </div>
  );
};

export default Room;
