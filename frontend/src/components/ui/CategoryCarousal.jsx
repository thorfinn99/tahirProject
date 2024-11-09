import { setSearchQuery } from '@/redux/jobSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function CategoryCarousal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const jobs = [
    "Software Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "UI/UX Designer",
    "Cybersecurity Specialist",
    "Cloud Architect",
    "Product Manager",
    "AI Researcher",
    "Blockchain Developer"
  ];

  const searchJobHandler = (query) => {
    console.log("clicked");
    dispatch(setSearchQuery(query))
    navigate("/browse")
}

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < jobs.length - 4) { // Adjusted to match the number of visible items
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <>
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div className="flex items-center justify-center overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 20}%)`, // Shows 4 items at a time with partial visibility
          }}
        >
          {jobs.map((job, index) => (
            <div
              key={index}
              className="w-1/2 px-4 mb-1 py-2 text-center bg-gray-50 mx-2 rounded-[300px] shadow-md  md:text-lg font-medium"
              style={{ flex: "0 0 23.33%" }} // 23.33% width for each item
            >
              <button onClick={()=> searchJobHandler(job)} >{job}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Prev Button - Only show if not at the beginning */}
      {activeIndex > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute top-1/2 left-0 z-30 -translate-y-1/2 flex items-center justify-center h-10 w-10 bg-white rounded-full shadow-lg focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Next Button - Only show if not at the end */}
      {activeIndex < jobs.length - 4 && ( // Adjusted to ensure it only shows until the last visible job
        <button
          type="button"
          onClick={handleNext}
          className="absolute top-1/2 right-0 z-30 -translate-y-1/2 flex items-center justify-center h-10 w-10 bg-white rounded-full shadow-lg focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
    </>
  );
}

export default CategoryCarousal;
