import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    date: {
        type: Date,
        default: Date.now,
        required: true
    },

    totalCalories: {
        type: Number,
        default: 0
    },

    totalProtein: {
        type: Number,
        default: 0
    },

    totalCarbs: {
        type: Number,
        default: 0
    },

    totalFats: {
        type: Number,
        default: 0
    },

    waterIntake: {
        type: Number, // in liters or ml (decide one)
        default: 0
    }

}, { timestamps: true });

const nutritionModel = mongoose.model("Nutrition", nutritionSchema);

export default nutritionModel