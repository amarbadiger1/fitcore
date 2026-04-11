import React, { useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Nutrition = () => {

    const [data] = useState({
        caloriesLeft: 1820,
        protein: { current: 124, goal: 180 },
        carbs: { current: 210, goal: 250 },
        fats: { current: 42, goal: 70 },
    });

    const days = ["Mon 18", "Tue 19", "Wed 20", "Thu 21", "Fri 22"];

    return (
        <div className="w-full bg-[#f5f6f8] min-h-screen">

            <div className="w-10/12 mx-auto p-4 md:p-6">

                {/* TOP CARD */}
                <div className="bg-white rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center gap-6">

                    {/* CIRCLE */}
                    <div className="w-32 h-32">
                        <CircularProgressbarWithChildren
                            value={70}
                            styles={buildStyles({
                                pathColor: "#0f172a",
                                trailColor: "#e5e7eb",
                            })}
                        >
                            <div className="text-center">
                                <p className="text-xl font-bold">{data.caloriesLeft}</p>
                                <p className="text-xs text-gray-500">kcal left</p>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>

                    {/* MACROS */}
                    <div className="flex-1 w-full">

                        {/* Protein */}
                        <MacroBar
                            label="Protein"
                            value={data.protein.current}
                            goal={data.protein.goal}
                            color="bg-black"
                        />

                        {/* Carbs */}
                        <MacroBar
                            label="Carbs"
                            value={data.carbs.current}
                            goal={data.carbs.goal}
                            color="bg-blue-400"
                        />

                        {/* Fats */}
                        <MacroBar
                            label="Fats"
                            value={data.fats.current}
                            goal={data.fats.goal}
                            color="bg-orange-400"
                        />

                    </div>

                    {/* QUALITY */}
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Average Quality</p>
                        <p className="text-3xl font-bold text-[#D4F042]">8.4</p>
                        <p className="text-green-500 text-sm">High Fiber Day</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* LEFT SIDE */}
                    <div className="md:col-span-2 bg-white rounded-2xl p-6">

                        {/* DAYS */}
                        <div className="flex gap-4 mb-6">
                            {days.map((d, i) => (
                                <button
                                    key={i}
                                    className={`px-4 py-2 rounded-xl text-sm ${i === 1
                                            ? "bg-[#0f172a] text-white"
                                            : "text-gray-500"
                                        }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>

                        {/* BREAKFAST */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-lg">Breakfast</h2>
                            <p className="text-sm text-gray-500">420 kcal • Add Item +</p>
                        </div>

                        <MealItem
                            title="Scrambled Eggs (3)"
                            desc="18g Protein • 15g Fat"
                            kcal="210 kcal"
                        />

                        <MealItem
                            title="Avocado (Half)"
                            desc="2g Protein • 12g Fat"
                            kcal="160 kcal"
                        />

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="bg-white rounded-2xl p-6">

                        <h2 className="font-semibold text-lg mb-2">
                            Suggested Meal Plan
                        </h2>

                        <p className="text-sm text-gray-500 mb-4">
                            Based on your muscle-gain goal and today's activity level.
                        </p>

                        {/* CARD 1 */}
                        <div className="border-l-4 border-[#D4F042] bg-gray-50 p-4 rounded-xl mb-4">
                            <p className="text-xs text-gray-500 mb-1">DINNER TARGET</p>
                            <p className="font-semibold">Miso Glazed Salmon</p>
                            <p className="text-sm text-gray-500 mb-3">
                                High Omega-3 • 35g Protein
                            </p>
                            <button className="w-full py-2 rounded-full bg-[#D4F042] font-semibold">
                                Add to Diary
                            </button>
                        </div>

                        {/* CARD 2 */}
                        <div className="border-l-4 border-blue-300 bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-500 mb-1">POST-WORKOUT</p>
                            <p className="font-semibold">Whey Isolate & Berries</p>
                            <p className="text-sm text-gray-500">
                                Fast Absorption • 120 kcal
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default Nutrition;



/* 🔥 COMPONENTS */

const MacroBar = ({ label, value, goal, color }) => {
    const percent = (value / goal) * 100;

    return (
        <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
                <p className="text-gray-600">{label}</p>
                <p>
                    {value}g / <span className="text-gray-400">{goal}g</span>
                </p>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded">
                <div
                    className={`${color} h-2 rounded`}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
};

const MealItem = ({ title, desc, kcal }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center mb-3">
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <p className="text-gray-700">{kcal}</p>
        </div>
    );
};