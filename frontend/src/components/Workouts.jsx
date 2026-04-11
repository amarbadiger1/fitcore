import React from "react";

const workouts = [
  {
    name: "Push Day",
    desc: "Chest, Shoulders, Triceps",
    exercises: ["Bench Press", "Shoulder Press", "Tricep Dips"],
  },
  {
    name: "Pull Day",
    desc: "Back, Biceps",
    exercises: ["Pull-ups", "Deadlift", "Bicep Curls"],
  },
  {
    name: "Leg Day",
    desc: "Quads, Hamstrings, Glutes",
    exercises: ["Squats", "Lunges", "Leg Press"],
  },
];

const Workouts = () => {
  return (
    <div className="w-full bg-white py-20 px-4">

      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold">
          Workout Plans 🏋️
        </h1>
        <p className="text-gray-500 mt-4">
          Structured routines for maximum results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {workouts.map((workout, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all"
          >
            <h3 className="text-xl font-semibold">{workout.name}</h3>
            <p className="text-gray-500 mb-4">{workout.desc}</p>

            <ul className="space-y-2">
              {workout.exercises.map((ex, index) => (
                <li key={index} className="flex gap-2">
                  <span>🔥</span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Workouts;