import express, { Router } from "express"
import jwtVerification from "../middleware/jwtVerification.js";
import { addMeal, deleteMeal, getMealsByDate, getSingleMeal } from "../controller/nutrition.controller.js";
const router = express.Router();

// router.get("/getnutritiondetails", jwtVerification, getNutritionDetails)

router.post("/addmeal", jwtVerification, addMeal)
router.get("/getsinglemeal", jwtVerification, getSingleMeal)
router.delete("/deletemeal",jwtVerification,deleteMeal)
router.get("/mealsbydate",jwtVerification,getMealsByDate)


export default router;