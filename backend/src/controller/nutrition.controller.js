import nutritionModel from "../models/nutrition.model.js"
import mealsModel from "../models/meals.model.js"
import mealItemModel from "../models/mealsItem.model.js"
export const getNutritionDetails = async (req, res) => {
    try {
        const userId = req.userId; // make sure middleware sets this

        const { type, name, photo, quantity, calories, protein, carbs, fats } = req.body;

        // ✅ Get today's date (start of day)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // ✅ 1. Find or Create Nutrition (per day)
        const nutrition = await nutritionModel.findOneAndUpdate(
            {
                userId,
                date: today
            },
            {
                $setOnInsert: {
                    userId,
                    date: today,
                    totalCalories: 0,
                    totalProtein: 0,
                    totalCarbs: 0,
                    totalFats: 0
                }
            },
            {
                upsert: true,
                new: true
            }
        );

        // ✅ 2. Find or Create Meal (breakfast/lunch/dinner/snacks)
        let meal = await mealsModel.findOne({
            nutritionId: nutrition._id,
            mealType: type
        });

        if (!meal) {
            meal = await mealsModel.create({
                nutritionId: nutrition._id,
                mealType: type
            });
        }

        // ✅ 3. Create Meal Item
        const mealItem = await mealItemModel.create({
            mealId: meal._id,
            name,
            photo,
            quantity,
            calories,
            protein,
            carbs,
            fats
        });

        // ✅ 4. Update Nutrition totals
        await nutritionModel.updateOne(
            { _id: nutrition._id },
            {
                $inc: {
                    totalCalories: calories,
                    totalProtein: protein,
                    totalCarbs: carbs,
                    totalFats: fats
                }
            }
        );

        return res.status(201).json({
            message: "Meal added successfully",
            data: {
                nutritionId: nutrition._id,
                mealId: meal._id,
                mealItem
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const addMeal = async (req, res) => {
    try {
        const id = req.id;
        const { type } = req.body;

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
        })
    }
}