import express from "express"
import jwtVerification from "../middleware/jwtVerification.js"
import { addWater, deleteWater, getWater } from "../controller/waterIntake.controller.js"
const router = express.Router()

router.get("/getWater", jwtVerification, getWater)
router.post("/addWater", jwtVerification, addWater)
router.get("/deleteWater", jwtVerification, deleteWater)


export default router