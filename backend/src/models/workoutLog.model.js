import mongoose from "mongoose";

const workoutLogsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    workoutDay: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    totalDuration: {
      type: Number,
      default: 0,
    },

    caloriesBurned: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const WorkoutLog = mongoose.model("WorkoutLog", workoutLogsSchema);

export default WorkoutLog;