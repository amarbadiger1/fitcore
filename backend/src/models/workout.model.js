import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    workoutLogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutLog",
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
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;