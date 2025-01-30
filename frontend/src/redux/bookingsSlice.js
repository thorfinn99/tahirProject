import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: "bookings",
    initialState:{
        bookings: [],
        myBookings: [],
    },
    reducers:{
        setBookings: (state, action) => {
            state.bookings = action.payload;
        },
        setMyBookings: (state, action) => {
            state.myBookings = action.payload;
        }
    }
})
export const { setBookings, setMyBookings } = bookingSlice.actions;
export default bookingSlice.reducer;