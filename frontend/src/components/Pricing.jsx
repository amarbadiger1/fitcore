import React from "react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    desc: "Perfect to get started",
    features: [
      "Basic workout tracking",
      "Limited analytics",
      "Community support",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹499/mo",
    desc: "Best for serious athletes",
    features: [
      "Advanced analytics",
      "AI workout plans",
      "Nutrition tracking",
      "Priority support",
    ],
    highlighted: true,
  },
];

const Pricing = () => {
  return (
    <div className="w-full bg-white py-20 px-4">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Choose the plan that fits your fitness journey
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl p-8 border transition-all duration-300 flex flex-col justify-between
              ${plan.highlighted
                ? "bg-[#D4F042] border-[#D4F042] shadow-xl scale-105"
                : "bg-white border-gray-200 hover:shadow-xl hover:-translate-y-2"
              }`}
          >

            {/* TOP */}
            <div>
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-gray-600 mt-2">{plan.desc}</p>

              <h1 className="text-3xl font-bold mt-6">{plan.price}</h1>

              {/* FEATURES */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>✔️</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* BUTTON */}
            <button
              className={`mt-8 py-3 rounded-lg font-semibold
                ${plan.highlighted
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-[#D4F042] hover:bg-[#c4e030]"
                }`}
            >
              Get Started
            </button>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Pricing;