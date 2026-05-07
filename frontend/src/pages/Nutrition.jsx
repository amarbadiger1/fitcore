import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import API from "../services/api"
import MacroBar from "../components/MacroBar"
import MealItem from "../components/MealItem"
import { toast } from "react-toastify"

const Nutrition = () => {
  const [nutrition, setNutrition] = useState(null);
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [userdata, setUserdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
    dailyCalorieTarget: "",
  });


  const fetchUser = async () => {
    try {
      const res = await API.get("/user/getme");
      console.log(res.data.user, "hello");
      setUserdata(res.data.user)
    } catch (error) {
      const err = error?.response?.data?.message || "Someting Went Wrong";
      toast.error(err);
    }
  }

  const [formData, setFormData] = useState({
    mealType: "breakfast",
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    quantity: 1,
  });

  const caloriesGoal = userdata.dailyCalorieTarget;

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);


  const fetchData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const res = await API.get("/nutrition/mealsbydate", {
        params: { date: today }
      });
      console.log(res.data.meals);
      setMeals(res.data.meals)
      setNutrition(res.data.nutrition)
    } catch (error) {
      const err = error?.response?.data?.message || "Error fetching meals";
      toast.error(err);
    }
  };

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

      toast.success("Item added Successfully");

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const caloriesLeft = nutrition
    ? caloriesGoal - (nutrition.totalCalories || 0)
    : caloriesGoal;

  return (
    <div className="w-full bg-[#f5f6f8] min-h-screen">
      <div className="w-10/12 mx-auto p-4 md:p-6">

        {/* TOP CARD */}
        <div className="bg-white rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center gap-6">

          <div className="w-32 h-32">
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
                <p className="text-xl font-bold">{caloriesLeft}</p>
                <p className="text-xs text-gray-500">kcal left</p>
              </div>
            </CircularProgressbarWithChildren>
          </div>

          {/* MACROS */}
          <div className="flex-1 w-full">
            <MacroBar label="Protein" value={nutrition?.totalProtein || 0} goal={userdata.protein} color="bg-black" />
            <MacroBar label="Carbs" value={nutrition?.totalCarbs || 0} goal={userdata.carbs} color="bg-blue-400" />
            <MacroBar label="Fats" value={nutrition?.totalFats || 0} goal={userdata.fats} color="bg-orange-400" />
          </div>


        </div>

        {/* HEADER + BUTTON */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Meals</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            + Add Meal
          </button>
        </div>

        {/* MEALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl p-6">

            {meals.length === 0 && (
              <p className="text-gray-500">No meals added today</p>
            )}

            {meals.map((meal) => (
              <div key={meal._id} className="mb-6">

                <h2 className="font-semibold text-lg capitalize mb-4">
                  {meal.mealType}
                </h2>

                {meal.items.length === 0 && (
                  <p className="text-sm text-gray-400">No items</p>
                )}

                {meal.items.map((item, i) => (
                  <MealItem
                    key={i}
                    title={`${item.name} (${item.quantity || 1})`}
                    desc={`${item.protein || 0}g Protein • ${item.fats || 0}g Fat`}
                    kcal={`${(item.calories || 0) * (item.quantity || 1)} kcal`}
                  />
                ))}

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px]">

            <h2 className="text-lg font-semibold mb-4">Add Meal</h2>

            <select
              className="w-full border p-2 mb-3 rounded"
              value={formData.mealType}
              onChange={(e) =>
                setFormData({ ...formData, mealType: e.target.value })
              }
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>

            <input placeholder="Food Name" className="w-full border p-2 mb-2 rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input placeholder="Calories" type="number" className="w-full border p-2 mb-2 rounded"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
            />

            <input placeholder="Protein" type="number" className="w-full border p-2 mb-2 rounded"
              value={formData.protein}
              onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
            />

            <input placeholder="Carbs" type="number" className="w-full border p-2 mb-2 rounded"
              value={formData.carbs}
              onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
            />

            <input placeholder="Fats" type="number" className="w-full border p-2 mb-2 rounded"
              value={formData.fats}
              onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
            />

            <input placeholder="Quantity" type="number" className="w-full border p-2 mb-2 rounded"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddMeal}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Nutrition;