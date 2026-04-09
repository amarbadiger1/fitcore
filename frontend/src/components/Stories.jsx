import React from "react";

const stories = [
  {
    name: "Rahul Sharma",
    role: "Bodybuilder",
    text: "FitCore transformed my training. I gained 5kg muscle in 4 months with proper tracking.",
  },
  {
    name: "Priya Patel",
    role: "Fitness Enthusiast",
    text: "The nutrition engine is insane. It tells me exactly what to eat daily!",
  },
  {
    name: "Arjun Mehta",
    role: "Athlete",
    text: "Workout plans adapt automatically. No more plateaus!",
  },
];

const Stories = () => {
  return (
    <div className="w-full h-[90vh] bg-gray-50 py-20 px-4">

      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold">
          Success Stories 💪
        </h1>
        <p className="text-gray-500 mt-4">
          Real people. Real results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {stories.map((story, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all"
          >
            <p className="text-gray-600 mb-6">"{story.text}"</p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <h4 className="font-semibold">{story.name}</h4>
                <p className="text-sm text-gray-500">{story.role}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Stories;