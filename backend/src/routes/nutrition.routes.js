import express, { Router } from "express"
import jwtVerification from "../middleware/jwtVerification.js";
import { addMeal, getNutritionDetails } from "../controller/nutrition.controller.js";
const router = express.Router();

router.get("/getnutritiondetails", jwtVerification, getNutritionDetails)
router.post("/addmeal",jwtVerification,addMeal)


export default router;