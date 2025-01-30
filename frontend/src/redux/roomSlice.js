import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    availableRooms: [],
    searchData: {
      startDate: "",
      endDate: ""
    }
  },

  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setAvailableRooms: (state, action) => {
      state.availableRooms = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  }
});

export const { setRooms, setAvailableRooms, setSearchData } = roomSlice.actions;
export default roomSlice.reducer;
