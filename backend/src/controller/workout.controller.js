import Workout from "../models/workout.model.js";
import WorkoutLog from "../models/workoutLog.model.js";

export const addWorkout = async (req, res) => {

    try {

        const userId = req.id;

        const {
            workoutDay,
            workoutName,
            sets,
            duration,
        } = req.body;

        // ====================================
        // TODAY RANGE
        // ====================================

        const start = new Date();

        start.setHours(0, 0, 0, 0);

        const end = new Date();

        end.setHours(23, 59, 59, 999);

        // ====================================
        // FIND OR CREATE TODAY'S WORKOUT LOG
        // ====================================

        let workoutLog = await WorkoutLog.findOneAndUpdate(
            {
                userId,
                date: {
                    $gte: start,
                    $lte: end,
                },
            },
            {
                $setOnInsert: {
                    userId,
                    workoutDay,
                    date: new Date(),
                    totalDuration: 0,
                    caloriesBurned: 0,
                },
            },
            {
                upsert: true,
                new: true,
            }
        );

        // ====================================
        // CREATE EXERCISE
        // ====================================

        const workout = await Workout.create({
            workoutLogId: workoutLog._id,
            workoutName,
            sets,
            duration,
        });

        // ====================================
        // UPDATE TOTAL DURATION
        // ====================================

        await WorkoutLog.updateOne(
            {
                _id: workoutLog._id,
            },
            {
                $inc: {
                    totalDuration: duration || 0,
                },
            }
        );

        // ====================================
        // RESPONSE
        // ====================================

        return res.status(201).json({
            success: true,
            message: "Workout added successfully",
            data: {
                workoutLogId: workoutLog._id,
                workout,
            },
        });

    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

export const GetWorkOutDetailsByDate = async (req, res) => {

    try {

        const userId = req.id;

        const { date } = req.query;

        // =========================
        // DATE RANGE
        // =========================

        const selectedDate = new Date(date);

        const start = new Date(selectedDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(selectedDate);
        end.setHours(23, 59, 59, 999);

        // =========================
        // GET WORKOUT LOGS
        // =========================

        const workoutLogs = await WorkoutLog.find({
            userId,
            date: {
                $gte: start,
                $lte: end,
            },
        });

        if (workoutLogs.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No workouts found",
            });

        }

        // =========================
        // GET EXERCISES
        // =========================

        const formattedWorkouts = await Promise.all(

            workoutLogs.map(async (log) => {

                const exercises = await Workout.find({
                    workoutLogId: log._id,
                });

                return {
                    ...log._doc,
                    exercises,
                };

            })

        );

        return res.status(200).json({
            success: true,
            workouts: formattedWorkouts[0],
        });

    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};