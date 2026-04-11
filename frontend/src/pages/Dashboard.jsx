import React, { useState } from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  // 🔥 Dummy Data
  const [data, setData] = useState({
    calories: {
      burned: 2450,
      goal: 3200,
      protein: 142,
      carbs: 210,
      fats: 54,
    },
    water: {
      current: 1.5,
      goal: 2.5,
    },
    workouts: [
      {
        id: 1,
        title: "Upper Body Strength",
        duration: "45 min",
        exercises: "6 exercises",
        status: "Completed",
      },
      {
        id: 2,
        title: "HIIT Cardio",
        duration: "20 min",
        exercises: "Intense",
        status: "Scheduled 5:00 PM",
      },
    ],
  });

  // 🔥 Calculations
  const { burned, goal, protein, carbs, fats } = data.calories;
  const remaining = goal - burned;
  const progress = (burned / goal) * 100;

  const waterBars = 8;
  const filledBars = Math.round(
    (data.water.current / data.water.goal) * waterBars
  );

  return (
    <div className="w-full bg-[#f5f6f8]">
      <div className="min-h-screen w-10/12 mx-auto p-4 md:p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CALORIES CARD */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">

            <div>
              <h2 className="text-gray-700 font-semibold mb-2">
                Calories Burned
              </h2>

              <h1 className="text-5xl font-bold text-gray-900">
                {burned.toLocaleString()}
              </h1>

              <p className="text-gray-500 mt-1">
                out of {goal.toLocaleString()} kcal goal
              </p>

              <div className="flex gap-6 mt-6 text-sm">
                <div>
                  <p className="text-gray-500">● Protein</p>
                  <p className="font-semibold">{protein}g</p>
                </div>
                <div>
                  <p className="text-gray-500">● Carbs</p>
                  <p className="font-semibold">{carbs}g</p>
                </div>
                <div>
                  <p className="text-gray-500">● Fats</p>
                  <p className="font-semibold">{fats}g</p>
                </div>
              </div>
            </div>

            {/* 🔥 Circular Progress */}
            <div className="w-28 h-28">
              <CircularProgressbar
                value={progress}
                text={`${remaining}`}
                styles={buildStyles({
                  pathColor: "#D4F042",
                  trailColor: "#e5e7eb",
                  textColor: "#111827",
                  strokeLinecap: "round",
                })}
              />
            </div>
          </div>

          {/* WATER CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-gray-700">Water</h2>
              <p className="text-gray-500 text-sm">
                {data.water.current} / {data.water.goal} L
              </p>
            </div>

            <div className="flex gap-2 mb-4">
              {[...Array(waterBars)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-16 rounded-full ${
                    i < filledBars ? "bg-blue-300" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">
                Last drink: 1hr ago
              </p>
              <button
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    water: {
                      ...prev.water,
                      current: Math.min(
                        prev.water.current + 0.25,
                        prev.water.goal
                      ),
                    },
                  }))
                }
                className="px-3 py-1 rounded-full bg-gray-100 text-sm"
              >
                + 250ml
              </button>
            </div>
          </div>

          {/* AI CARD */}
          <div className="bg-gradient-to-br from-[#1f2a3a] to-[#2c3e50] text-white rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                AI Food Scanner
              </h2>
              <p className="text-sm text-gray-300">
                Snap a meal to track calories
              </p>
            </div>

            <button className="mt-10 bg-white/20 border border-white/30 rounded-full py-3">
              Tap to analyze photo
            </button>
          </div>

          {/* WORKOUT CARD */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">

            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">
                Today's Plan
              </h2>
              <button className="bg-[#D4F042] px-4 py-2 rounded-full font-semibold">
                Start Workout
              </button>
            </div>

            {data.workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-gray-50 p-4 rounded-xl flex justify-between items-center mb-3"
              >
                <div>
                  <p className="font-medium">{workout.title}</p>
                  <p className="text-sm text-gray-500">
                    {workout.duration} • {workout.exercises}
                  </p>
                </div>
                <p className="text-gray-400">{workout.status}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;