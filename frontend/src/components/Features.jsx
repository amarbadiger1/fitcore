import React from "react";

const features = [
  "Workout Tracking",
  "Water Intake Tracker",
  "Calorie Counter",
  "AI Diet Plans",
  "Progress Analytics",
  "Custom Workout Plans",
  "Step Counter",
  "Sleep Tracking",
  "Body Measurements",
];

const Features = () => {
  return (
    <div className="w-full h-[90vh] bg-gray-50 py-20 px-4">

      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold">
          Powerful Features 🚀
        </h1>
        <p className="text-gray-500 mt-4">
          Everything you need in one platform
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-7xl mx-auto">

        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-lg hover:-translate-y-2 transition-all"
          >
            <p className="font-medium">{feature}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Features;