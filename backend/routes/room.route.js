import express from "express"
import { login, register, logout, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js";
import { addRoom, bookRooms, checkAvailability, getAllRooms } from "../controllers/room.controller.js";
import { createBookingRequest } from "../controllers/bookings.controller.js";

const router = express.Router();

router.route("/add").post(singleUpload,isAuthenticated,addRoom)
router.route("/check").post(isAuthenticated,checkAvailability)
router.route("/get").get(getAllRooms)

export default router;