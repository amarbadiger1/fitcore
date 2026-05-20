import React, { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import API from "../services/api";
import MacroBar from "../components/MacroBar";
import MealItem from "../components/MealItem";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Nutrition = () => {
  const user = useSelector((state) => state.user?.data);

  const [nutrition, setNutrition] = useState(null);
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [formData, setFormData] = useState({
    mealType: "breakfast",
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    quantity: 1,
  });

  const caloriesGoal = user?.dailyCalorieTarget || 2000;

  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);

      const today = new Date().toISOString().split("T")[0];

      const res = await API.get("/nutrition/mealsbydate", {
        params: { date: today },
      });

      setMeals(res.data.meals);
      setNutrition(res.data.nutrition);

    } catch (error) {

      const err =
        error?.response?.data?.message || "Error fetching meals";

      toast.error(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ANALYZE MEAL USING AI
  const analyzeMeal = async () => {
    try {

      if (!formData.name.trim()) {
        toast.error("Please enter meal name");
        return;
      }

      setAnalyzing(true);

      const response = await API.post(
        "/nutrition/analys",
        {
          meal: formData.name,
        }
      );

      const data = response.data.data;
      setFormData((prev) => ({
        ...prev,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fats: data.fats,
      }));

      toast.success("Meal analyzed successfully");

    } catch (error) {

      console.log(error);

      toast.error("Failed to analyze meal");

    } finally {
      setAnalyzing(false);
    }
  };

  // ADD MEAL
  const handleAddMeal = async () => {
    try {

      const today = new Date().toISOString().split("T")[0];

      await API.post("/nutrition/addmeal", {
        mealType: formData.mealType,
        date: today,
        name: formData.name,
        calories: Number(formData.calories),
        protein: Number(formData.protein),
        carbs: Number(formData.carbs),
        fats: Number(formData.fats),
        quantity: Number(formData.quantity),
      });

      setShowModal(false);

      setFormData({
        mealType: "breakfast",
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        quantity: 1,
      });

      toast.success("Meal added successfully");

      fetchData();

    } catch (error) {

      console.log(error);

      toast.error("Failed to add meal");
    }
  };

  const caloriesLeft = nutrition
    ? caloriesGoal - (nutrition.totalCalories || 0)
    : caloriesGoal;

  return (
    <div className="w-full bg-[#f5f6f8] min-h-screen">

      <div className="w-11/12 max-w-7xl mx-auto p-4 md:p-6">

        {/* TOP CARD */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">

          {/* CIRCLE */}
          <div className="w-36 h-36">

            <CircularProgressbarWithChildren
              value={
                nutrition
                  ? (nutrition.totalCalories / caloriesGoal) * 100
                  : 0
              }
              styles={buildStyles({
                pathColor: "#0f172a",
                trailColor: "#e5e7eb",
              })}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-black">
                  {caloriesLeft}
                </p>

                <p className="text-xs text-gray-500">
                  kcal left
                </p>
              </div>
            </CircularProgressbarWithChildren>

          </div>

          {/* MACROS */}
          <div className="flex-1 w-full">

            <MacroBar
              label="Protein"
              value={nutrition?.totalProtein || 0}
              goal={user?.protein || 0}
              color="bg-black"
            />

            <MacroBar
              label="Carbs"
              value={nutrition?.totalCarbs || 0}
              goal={user?.carbs || 0}
              color="bg-blue-400"
            />

            <MacroBar
              label="Fats"
              value={nutrition?.totalFats || 0}
              goal={user?.fats || 0}
              color="bg-orange-400"
            />

          </div>

        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">

          <div>
            <h1 className="text-2xl font-bold text-black">
              Today's Meals
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Track your nutrition daily
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-2xl transition"
          >
            + Add Meal
          </button>

        </div>

        {/* MEALS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          {loading ? (

            <div className="text-center py-10">
              <p className="text-gray-500">
                Loading meals...
              </p>
            </div>

          ) : meals.length === 0 ? (

            <div className="text-center py-16">

              <h2 className="text-xl font-semibold text-gray-700">
                No meals tracked today
              </h2>

              <p className="text-gray-400 mt-2">
                Start tracking your nutrition
              </p>

            </div>

          ) : (

            meals.map((meal) => (
              <div
                key={meal._id}
                className="mb-10"
              >

                <div className="flex items-center justify-between mb-4">

                  <h2 className="font-bold text-xl capitalize">
                    {meal.mealType}
                  </h2>

                  <span className="text-sm text-gray-500">
                    {meal.items.length} items
                  </span>

                </div>

                <div className="space-y-3">

                  {meal.items.map((item, i) => (
                    <MealItem
                      key={i}
                      title={`${item.name} (${item.quantity || 1})`}
                      desc={`${item.protein || 0}g Protein • ${item.fats || 0}g Fat`}
                      kcal={`${(item.calories || 0) *
                        (item.quantity || 1)} kcal`}
                    />
                  ))}

                </div>

              </div>
            ))
          )}

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="bg-[#0f172a] text-white p-8 flex flex-col justify-between">

              <div>

                <h2 className="text-4xl font-bold mb-4">
                  Add Your Meal
                </h2>

                <p className="text-gray-300 leading-7">
                  AI powered nutrition tracking for smarter eating and better fitness progress.
                </p>

              </div>

              <div className="space-y-5 mt-10">

                <div className="bg-white/10 rounded-2xl p-5">
                  <p className="text-sm text-gray-300">
                    AI Nutrition
                  </p>

                  <h3 className="text-xl font-semibold mt-1">
                    Smart Meal Analysis
                  </h3>
                </div>

                <div className="bg-white/10 rounded-2xl p-5">
                  <p className="text-sm text-gray-300">
                    Macro Tracking
                  </p>

                  <h3 className="text-xl font-semibold mt-1">
                    Reach Daily Goals
                  </h3>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="p-8 overflow-y-auto max-h-[90vh]">

              {/* AI INPUT */}
              <div className="mb-7">

                <label className="text-sm text-gray-500 font-medium">
                  Describe Your Meal
                </label>

                <div className="flex gap-3 mt-2">

                  <input
                    type="text"
                    placeholder="2 eggs and chicken rice"
                    className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />

                  <button
                    onClick={analyzeMeal}
                    className="bg-black text-white px-6 rounded-2xl hover:bg-gray-800 transition"
                  >
                    {analyzing ? "Analyzing..." : "Analyze"}
                  </button>

                </div>

              </div>

              {/* FORM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>

                  <label className="text-sm text-gray-500 font-medium">
                    Meal Type
                  </label>

                  <select
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 mt-2"
                    value={formData.mealType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mealType: e.target.value,
                      })
                    }
                  >
                    <option value="breakfast">
                      Breakfast
                    </option>

                    <option value="lunch">
                      Lunch
                    </option>

                    <option value="dinner">
                      Dinner
                    </option>

                    <option value="snack">
                      Snack
                    </option>

                  </select>

                </div>

                <div>

                  <label className="text-sm text-gray-500 font-medium">
                    Quantity
                  </label>

                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 mt-2"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: e.target.value,
                      })
                    }
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-500 font-medium">
                    Calories
                  </label>

                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        calories: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mt-2"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-500 font-medium">
                    Protein
                  </label>

                  <input
                    type="number"
                    value={formData.protein}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        protein: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mt-2"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-500 font-medium">
                    Carbs
                  </label>

                  <input
                    type="number"
                    value={formData.carbs}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        carbs: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mt-2"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-500 font-medium">
                    Fats
                  </label>

                  <input
                    type="number"
                    value={formData.fats}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fats: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mt-2"
                  />

                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 mt-8">

                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddMeal}
                  className="px-6 py-3 rounded-2xl bg-black text-white hover:bg-gray-800 transition"
                >
                  Save Meal
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nutrition;