import nutritionModel from "../models/nutrition.model.js"
import mealsModel from "../models/meals.model.js"
import mealItemModel from "../models/mealsItem.model.js"

export const addMeal = async (req, res) => {
    try {
        const userId = req.id;
        const { mealType, name, calories, protein, carbs, fats, quantity } = req.body;

        //  STEP 1: Get today's range
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        //  STEP 2: Find or create today's nutrition
        let nutrition = await nutritionModel.findOneAndUpdate(
            {
                userId,
                date: { $gte: start, $lte: end }
            },
            {
                $setOnInsert: {
                    userId,
                    date: new Date(),
                    totalCalories: 0,
                    totalProtein: 0,
                    totalCarbs: 0,
                    totalFats: 0
                }
            },
            {
                new: true,
                upsert: true
            }
        );

        //  STEP 3: Find or create meal type (Breakfast/Lunch/etc.)
        let meal = await mealsModel.findOne({
            nutritionId: nutrition._id,
            mealType
        });

        if (!meal) {
            meal = await mealsModel.create({
                nutritionId: nutrition._id,
                mealType
            });
        }

        //  STEP 4: Create meal item
        const mealItem = await mealItemModel.create({
            mealId: meal._id,
            name,
            calories,
            protein,
            carbs,
            fats,
            quantity
        });

        // STEP 5: Update nutrition totals
        await nutritionModel.updateOne(
            { _id: nutrition._id },
            {
                $inc: {
                    totalCalories: calories || 0,
                    totalProtein: protein || 0,
                    totalCarbs: carbs || 0,
                    totalFats: fats || 0
                }
            }
        );

        // ✅RESPONSE
        return res.status(201).json({
            message: "Meal added successfully",
            data: {
                nutritionId: nutrition._id,
                mealId: meal._id,
                mealItem
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};