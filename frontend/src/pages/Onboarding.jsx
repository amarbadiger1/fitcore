import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
    activityLevel: "",
    goal: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log("Final Data:", formData);
    navigate("/dashboard");
  };

  const variants = {
    initial: { x: 80, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -80, opacity: 0 },
  };

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#D4F042] focus:ring-1 focus:ring-[#D4F042]";

  const btnPrimary =
    "w-full py-3 rounded-lg bg-[#D4F042] font-semibold hover:bg-[#c4e030] transition";

  const btnSecondary =
    "w-full py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100 transition";

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg">

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded mb-4">
          <div
            className="h-2 bg-[#D4F042] rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Step Text */}
        <p className="text-center text-sm text-gray-500 mb-6">
          Step {step} / {totalSteps}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Your Age</h2>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className={inputStyle}
                />
                <button onClick={next} className={`${btnPrimary} mt-4`}>Next</button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Your Weight (kg)</h2>
                <input
                  type="number"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className={inputStyle}
                />
                <div className="flex gap-3 mt-4">
                  <button onClick={prev} className={btnSecondary}>Back</button>
                  <button onClick={next} className={btnPrimary}>Next</button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Your Height (cm)</h2>
                <input
                  type="number"
                  placeholder="Enter height"
                  value={formData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  className={inputStyle}
                />
                <div className="flex gap-3 mt-4">
                  <button onClick={prev} className={btnSecondary}>Back</button>
                  <button onClick={next} className={btnPrimary}>Next</button>
                </div>
              </>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Gender</h2>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className={inputStyle}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="flex gap-3 mt-4">
                  <button onClick={prev} className={btnSecondary}>Back</button>
                  <button onClick={next} className={btnPrimary}>Next</button>
                </div>
              </>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Activity Level</h2>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => handleChange("activityLevel", e.target.value)}
                  className={inputStyle}
                >
                  <option value="">Select activity</option>
                  <option value="low">Sedentary (little/no exercise)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="high">Active (6-7 days/week)</option>
                </select>
                <div className="flex gap-3 mt-4">
                  <button onClick={prev} className={btnSecondary}>Back</button>
                  <button onClick={next} className={btnPrimary}>Next</button>
                </div>
              </>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Your Goal</h2>
                <select
                  value={formData.goal}
                  onChange={(e) => handleChange("goal", e.target.value)}
                  className={inputStyle}
                >
                  <option value="">Select goal</option>
                  <option value="lose">Lose Weight</option>
                  <option value="gain">Gain Muscle</option>
                  <option value="maintain">Maintain</option>
                </select>
                <div className="flex gap-3 mt-4">
                  <button onClick={prev} className={btnSecondary}>Back</button>
                  <button onClick={handleSubmit} className={btnPrimary}>
                    Finish
                  </button>
                </div>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;