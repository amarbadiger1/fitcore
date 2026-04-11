import React, { useState, useEffect } from "react";

const Workout = () => {

  // 🔥 TIMER
  const [seconds, setSeconds] = useState(765);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const exercises = [
    { title: "Barbell Bench Press", type: "Chest", level: "Compound • Intermediate" },
    { title: "Goblet Squats", type: "Legs", level: "Functional • Beginner" },
    { title: "Seated Cable Row", type: "Back", level: "Isolation • Intermediate" },
    { title: "Hanging Leg Raise", type: "Core", level: "Bodyweight • Advanced" },
  ];

  return (
    <div className="w-full bg-[#f5f6f8] min-h-screen">
      <div className="w-10/12 mx-auto p-4 md:p-6">

        {/* HEADER */}
        <p className="text-gray-500 text-sm">Training Center</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Your Workout Library
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search exercises, body parts, or equipment..."
          className="w-full bg-white rounded-full px-6 py-3 mb-6 outline-none border"
        />

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* EXERCISES */}
          {exercises.map((ex, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                +
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">{ex.type}</p>
                <h2 className="font-semibold">{ex.title}</h2>
                <p className="text-sm text-gray-500">{ex.level}</p>
              </div>
            </div>
          ))}

          {/* TIMER */}
          <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] text-white rounded-2xl p-6 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-400 mb-2">Active Timer</p>

            <h1 className="text-5xl font-bold text-[#D4F042] mb-4">
              {formatTime(seconds)}
            </h1>

            <div className="flex gap-3">
              <button
                onClick={() => setRunning(!running)}
                className="px-4 py-2 rounded-full bg-[#D4F042] text-black font-semibold"
              >
                {running ? "Pause" : "Start"}
              </button>

              <button
                onClick={() => setSeconds(0)}
                className="px-4 py-2 rounded-full border border-gray-500"
              >
                Reset
              </button>
            </div>
          </div>

          {/* CURRENT LOG */}
          <div className="bg-white rounded-2xl p-6 md:col-span-2 shadow-sm">

            <h2 className="font-semibold text-lg mb-2">Current Log</h2>

            <p className="text-sm text-gray-500 mb-4">
              Barbell Bench Press <br />
              <span className="text-xs">Working Set 2 of 4</span>
            </p>

            {/* HEAD */}
            <div className="grid grid-cols-3 text-sm text-gray-500 mb-2">
              <p>Set</p>
              <p>Weight (kg)</p>
              <p>Reps</p>
            </div>

            {/* ROWS */}
            <div className="grid grid-cols-3 items-center mb-3">
              <p>1 (Warm up)</p>
              <input className="bg-gray-100 p-2 rounded-lg w-20" defaultValue={40} />
              <input className="bg-gray-100 p-2 rounded-lg w-16" defaultValue={12} />
            </div>

            <div className="grid grid-cols-3 items-center mb-4">
              <p>2 (Active)</p>
              <input className="bg-gray-100 p-2 rounded-lg w-20" defaultValue={80} />
              <input className="bg-gray-100 p-2 rounded-lg w-16" placeholder="-" />
            </div>

            {/* BUTTONS */}
            <button className="w-full py-3 rounded-full bg-[#D4F042] font-semibold mb-3">
              Log Set
            </button>

            <button className="w-full py-3 rounded-full bg-gray-100 text-gray-700">
              Finish Workout
            </button>

          </div>

          {/* RECOMMENDED */}
          <div className="md:col-span-2">
            <h2 className="font-semibold text-lg mb-4">Recommended Plans</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <p className="font-medium">PPL: Push Day</p>
                <p className="text-sm text-gray-500">
                  6 Exercises • 55 mins
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <p className="font-medium">Full Body Blast</p>
                <p className="text-sm text-gray-500">
                  8 Exercises • 45 mins
                </p>
              </div>

            </div>
          </div>

          {/* HISTORY */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h2 className="font-semibold text-lg mb-3">
              Last Workout History
            </h2>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Pull Session</p>
                <p className="text-sm text-gray-500">
                  Yesterday • 1,240kg vol.
                </p>
              </div>
              <span className="text-gray-400 text-xl">›</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Workout;