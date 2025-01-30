import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    phoneNumber: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['guest', 'owner' ],
        required: true
    },
    bookings: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Room'
    },
    profile: {
        profilePhoto:{
                type:String,
                default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
        },

},{timestamps:true});

export const User = mongoose.model('User', userSchema )