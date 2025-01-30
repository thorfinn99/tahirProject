import mongoose from "mongoose"
const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
         required: true,
         default: "Kotha 401"
    },
    roomDescription: {
        type: String,
         required: true,
         default: "It is a room"
    },
    roomType: {
        type:String,
        required:true,
        enum: ['single', 'double', 'family'],
    },
    maxCount: {
        type: Number,
        required: true,
        default: '4',
    },
    roomRent: {
        type: Number,
        required: true,
    },
    roomImage: {
        type: String,
        required: true,
        default: "",
    },
    amenities: {
        type:[String],
        default: ["Wifi", "AC"]
    },
    currentBookings: [],
    
    
    
},{timestamps:true});

export const Room = mongoose.model('Room', roomSchema )