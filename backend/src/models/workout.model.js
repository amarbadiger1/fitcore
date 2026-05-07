import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    workoutLogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workoutLogs", 
      required: true,
    },

    workoutName: {
      type: String,
      required: true,
      trim: true,
    },

    sets: [
      {
        reps: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
      },
    ],

    duration: {
      type: Number, 
    },
  },
  {
    timestamps: true, 
  }
);

export const Workout = mongoose.model("Workout", workoutSchema);