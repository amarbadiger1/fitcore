import express from "express"
import upload from "../middleware/multer.js";
import jwtVerification from "../middleware/jwtVerification.js"
import { updateProfile, getMe } from "../controller/user.controller.js"
const router = express.Router();


// router.get("/profile:id");

router.patch("/updateprofile", jwtVerification, upload.single("profilePic"), updateProfile)
router.get("/getme", jwtVerification, getMe)


export default router;