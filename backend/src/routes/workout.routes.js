import express from "express"
import jwtVerification from "../middleware/jwtVerification.js";
import { addWorkout, GetWorkOutDetailsByDate } from "../controller/workout.controller.js";


const router = express.Router();


// router.get("/workoutbydate",jwtVerification,getWorkoutByDate)
router.post("/addWorkout", jwtVerification, addWorkout);
// router.post("/addExercise", jwtVerification, addExercise);
// router.get("/finishWorkout",jwtVerification,finishWorkout)
router.get("/getWorkoutDetailsbyDate",jwtVerification,GetWorkOutDetailsByDate);

export default router