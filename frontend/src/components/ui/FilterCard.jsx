import { setSearchQuery } from '@/redux/jobSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lac", "1lac to 5lac"]
  }
];

const FilterCard = () => {
  const [selectedFilter, setSelectedFilter] = useState('')
  const dispatch = useDispatch()


  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };
  useEffect(()=> {
    dispatch(setSearchQuery(selectedFilter))
  },[selectedFilter])

  return (
    <div className="md:p-4 p-2 max-w-lg mx-auto space-y-2 md:space-y-4">
      <h1 className='md:text-2xl text-1xl  font-bold' >Filter Jobs</h1>
      <hr />
      {filterData.map((filter) => (
        <div key={filter.filterType} className="space-y-2">
          <h4 className="md:text-lg font-semibold">{filter.filterType}</h4>
          <div className="space-y-">
            {filter.array.map((item) => (
              <div key={item} className="flex text-xs md:text-lg items-center space-x-1 md:space-x-2">
                <input
                  type="radio"
                  id={`${filter.filterType}-${item}`}
                  name={filter.filterType}
                  value={item}
                  checked={selectedFilter === item}
                  onChange={() => handleFilterChange(item)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor={`${filter.filterType}-${item}`}
                  className="cursor-pointer"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6">
        <h4 className="md:text-lg font-semibold">Selected Filters:</h4>
        <p className='text-xs font-semibold ' >{selectedFilter || "None"}</p>
      </div>
    </div>
  );
};

export default FilterCard;
