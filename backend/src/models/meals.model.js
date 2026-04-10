import mongoose from "mongoose";

const mealsSchema = new mongoose.Schema({
    nutritionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nutrition",
        required: true
    },
    type: {
        type: String,
        enum: ["breakfast", "lunch", "dinner", "snack"],
        required: true
    }
}, {
    timestamps: true
})

const mealsModel = mongoose.model("Meal", mealsSchema)

export default mealsModel