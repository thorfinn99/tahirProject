import express from "express"
import { login, register, logout, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js";
import { addRoom, bookRooms, checkAvailability, getAllRooms } from "../controllers/room.controller.js";
import { bookRoom, confirmBooking, createBookingRequest, getAllBookings, getMyBookings, updateStatus } from "../controllers/bookings.controller.js";

const router = express.Router(); 

router.route("/get").get(isAuthenticated,getAllBookings)
router.route("/get/myBookings").get(isAuthenticated,getMyBookings)
router.route("/cancelBooking").post(isAuthenticated,updateStatus)
router.route("/create/request").post(isAuthenticated, createBookingRequest)
router.route("/confirm/:bookingId").post(isAuthenticated, confirmBooking); 
router.route("/bookRoom").post(isAuthenticated, bookRoom);



export default router;