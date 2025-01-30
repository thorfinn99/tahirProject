import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room', // Reference to the Room model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    status: {
      type: String, default: 'Booked',
    },
    checkInDate: {
      type: String, required: true,
    },
    checkOutDate: {
      type: String, required: true,
    },
    totalAmount: {
      type: Number, required: true,
    },
    totalDays: {
      type: Number, required: true,
    },
    transactionId: {
      type: String, 
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
