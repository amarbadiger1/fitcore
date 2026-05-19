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
                returnDocument: 'after',
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

        const totalCal = (calories || 0) * (quantity || 1);
        const totalProt = (protein || 0) * (quantity || 1);
        const totalCarb = (carbs || 0) * (quantity || 1);
        const totalFat = (fats || 0) * (quantity || 1);

        // STEP 5: Update nutrition totals
        await nutritionModel.updateOne(
            { _id: nutrition._id },
            {
                $inc: {
                    totalCalories: calories,
                    totalProtein: protein,
                    totalCarbs: carbs,
                    totalFats: fats,
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


export const getSingleMeal = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Get meal
        const meal = await mealsModel.findById(id);

        if (!meal) {
            return res.status(404).json({
                success: false,
                message: "Meal not found"
            });
        }

        // 2. Get items of this meal
        const items = await mealItemModel.find({ mealId: id });

        // 3. Send response
        return res.status(200).json({
            success: true,
            meal,
            items
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteMeal = async (req, res) => {
    try {
        const { id } = req.params;

        const items = await mealItemModel.find({ mealId: id });
        await mealsModel.findByIdAndDelete(id);
        await mealItemModel.deleteMany({ mealId: id });

        res.status(200).json({
            success: true,
            message: "Meal deleted"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMealsByDate = async (req, res) => {
    try {
        const userId = req.id;
        const { date } = req.query;

        // 1. Convert date
        const selectedDate = new Date(date);

        const start = new Date(selectedDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(selectedDate);
        end.setHours(23, 59, 59, 999);

        // 2. Find nutrition
        const nutrition = await nutritionModel.findOne({
            userId,
            date: { $gte: start, $lte: end }
        });

        if (!nutrition) {
            return res.status(404).json({
                message: "Todays Nutrition is not added"
            });
        }

        // 3. Get meals
        const meals = await mealsModel.find({
            nutritionId: nutrition._id
        });

        // 4. Attach items to each meal
        const mealsWithItems = await Promise.all(
            meals.map(async (meal) => {
                const items = await mealItemModel.find({
                    mealId: meal._id
                });

                return {
                    ...meal.toObject(),
                    items
                };
            })
        );

        // 5. Response
        return res.status(200).json({
            success: true,
            nutrition,
            meals: mealsWithItems
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};