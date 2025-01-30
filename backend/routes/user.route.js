import express from "express"
import { login, register, logout, updateProfile, postQuery, getAllQuery } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated,singleUpload, updateProfile)
router.route("/contact").post(isAuthenticated, postQuery)
router.route("/get/contact").get(isAuthenticated, getAllQuery)

export default router;