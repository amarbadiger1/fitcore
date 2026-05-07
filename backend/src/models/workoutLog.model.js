import mongoose from "mongoose";

const workoutLogs = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    caloriesBurned: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const workoutLogs = mongoose.model("workoutlogs", workoutLogs)