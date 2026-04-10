import mongoose from "mongoose";

const mealItemSchema = new mongoose.Schema({
    mealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    calories: {
        type: Number,
        required: true
    },

    protein: {
        type: Number,
        default: 0
    },

    carbs: {
        type: Number,
        default: 0
    },

    fats: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: ""
    },
    quantity: {
        type: Number,
        default: 1
    }

}, { timestamps: true });

const mealItemModel = mongoose.model("MealItem", mealItemSchema);

export default mealItemModel