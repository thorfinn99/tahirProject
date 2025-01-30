import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="text-2xl font-semibold text-green-600 mb-6">
          Room Booked Successfully
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Go Back To Home Page
        </button>
      </div>
    </div>
  );
};

export default Success;
