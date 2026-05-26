import React, { useEffect, useState } from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import API from "../services/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {

  const user = useSelector((state) => state.user.data);
  const workout = useSelector((state) => state.workout.data)

  const [water, setWater] = useState({
    amount: 0,
  });

  // =========================
  // GET TODAY WATER
  // =========================
  const getWater = async () => {

    try {

      const response = await API.get("/water/getwater");

      setWater(response.data.water);

      console.log(response.data);
      console.log(user);


    } catch (error) {

      console.log(error);

      toast.error("Failed To Fetch Water");
    }
  };

  // =========================
  // ADD WATER
  // =========================
  const addWater = async () => {

    try {

      const response = await API.post("/water/addwater");

      setWater(response.data.water);

      toast.success("250ml Added");

    } catch (error) {

      console.log(error);

      toast.error("Failed To Add Water");
    }
  };

  useEffect(() => {
    getWater();
  }, []);

  // =========================
  // CALORIE DATA
  // =========================

  const calorieGoal = user?.dailyCalorieTarget || 0;

  const protein = user?.protein || 0;
  const carbs = user?.carbs || 0;
  const fats = user?.fats || 0;

  // Example consumed calories
  const consumedCalories = workout?.caloriesBurned || 0;

  const remainingCalories =
    calorieGoal - consumedCalories;

  const calorieProgress =
    calorieGoal > 0
      ? (consumedCalories / calorieGoal) * 100
      : 0;

  // =========================
  // WATER DATA
  // =========================

  // stored in ml
  const waterAmount = water?.amount || 0;

  // goal in ml
  const waterGoal = 3000;

  const waterProgress =
    (waterAmount / waterGoal) * 100;

  const waterBars = 8;

  const filledBars = Math.round(
    (waterAmount / waterGoal) * waterBars
  );

  return (

    <div className="w-full bg-[#f5f6f8] min-h-screen">

      <div className="w-11/12 lg:w-10/12 mx-auto p-4 md:p-6">

        {/* HEADING */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Hey {user?.firstname}
        </h2>


        <p>Track you Calories and Hydration here</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-gray-700 font-semibold mb-2">
                  Total Calories Burned
                </h2>

                <h1 className="text-5xl font-bold text-gray-900">
                  {consumedCalories}
                </h1>

                <p className="text-gray-500 mt-1">
                  out of {calorieGoal} kcal
                </p>

              </div>

              {/* CIRCLE */}
              <div className="w-28 h-28">

                <CircularProgressbar
                  value={calorieProgress}
                  text={`${remainingCalories}`}
                  styles={buildStyles({
                    pathColor: "#D4F042",
                    trailColor: "#e5e7eb",
                    textColor: "#111827",
                    strokeLinecap: "round",
                  })}
                />
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-8">

              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-500">
                  Daily Progress
                </p>

                <p className="font-semibold">
                  {Math.round(calorieProgress)}%
                </p>
              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-lime-300 rounded-full transition-all duration-500"
                  style={{
                    width: `${calorieProgress}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

            <div className="flex justify-between items-center mb-4">

              <h2 className="font-semibold text-gray-700">
                Water Intake
              </h2>

              <p className="text-sm text-gray-500">
                {waterAmount} / {waterGoal} ml
              </p>
            </div>

            {/* WATER BARS */}

            <div className="flex gap-2 mb-6">

              {[...Array(waterBars)].map((_, i) => (

                <div
                  key={i}
                  className={`w-8 h-24 rounded-full transition-all duration-300 ${i < filledBars
                    ? "bg-blue-400"
                    : "bg-gray-200"
                    }`}
                ></div>
              ))}
            </div>

            {/* WATER PROGRESS BAR */}

            <div className="mb-5">

              <div className="flex justify-between text-sm mb-2">

                <p className="text-gray-500">
                  Hydration Progress
                </p>

                <p className="font-semibold">
                  {Math.round(waterProgress)}%
                </p>
              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${waterProgress}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* BUTTON */}

            <button
              onClick={addWater}
              className="w-full py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-gray-700 transition"
            >
              + Add 250ml
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;