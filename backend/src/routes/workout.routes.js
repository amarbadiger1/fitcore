import express from "express"
import jwtVerification from "../middleware/jwtVerification";

const router = express.Router();


router.get("/workoutbydate",jwtVerification,getWorkoutByDate)







export default router