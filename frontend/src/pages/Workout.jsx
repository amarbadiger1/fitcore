import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setWorkout } from "../store/features/workoutSlice";

const Workout = () => {

  const dispatch = useDispatch();

  const workout = useSelector(
    (state) => state.workout.data
  );

  // LOADING STATE
  const [loading, setLoading] = useState(true);

  const [exercise, setExercise] = useState({
    workoutName: "",
    workoutDay: "",
    duration: "",
    sets: [
      {
        weight: "",
        reps: "",
      },
    ],
  });

  // GET WORKOUT DATA
  const getData = async () => {

    try {

      setLoading(true);

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const res = await API.get(
        "/workout/getWorkoutDetailsbyDate",
        {
          params: { date: today },
        }
      );

      const data = res.data.workouts;

      // STORE IN REDUX
      dispatch(setWorkout(data));

      // AUTO FILL WORKOUT DAY
      setExercise((prev) => ({
        ...prev,
        workoutDay: data?.workoutDay || "",
      }));

    } catch (error) {

      console.log(error);

      if (
        error?.response?.status !== 404
      ) {
        toast.error("Failed to fetch workouts");
      }

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    getData();
  }, []);

  // ADD WORKOUT
  const addWorkout = async () => {

    try {

      if (!exercise.workoutDay) {
        return toast.error("Workout Day Required");
      }

      if (!exercise.workoutName) {
        return toast.error("Exercise Name Required");
      }

      // VALIDATE SETS
      for (let set of exercise.sets) {

        if (!set.weight || !set.reps) {
          return toast.error(
            "All set fields required"
          );
        }

      }

      const payload = {

        workoutDay: exercise.workoutDay,

        workoutName: exercise.workoutName,

        duration: Number(exercise.duration),

        sets: exercise.sets.map((set) => ({
          weight: Number(set.weight),
          reps: Number(set.reps),
        })),

      };

      const res = await API.post(
        "/workout/addWorkout",
        payload
      );

      toast.success(res.data.message);

      // REFRESH DATA
      getData();

      // RESET FORM
      setExercise((prev) => ({
        ...prev,
        workoutName: "",
        duration: "",
        sets: [
          {
            weight: "",
            reps: "",
          },
        ],
      }));

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    }

  };

  // ADD SET
  const addSet = () => {

    setExercise((prev) => ({
      ...prev,
      sets: [
        ...prev.sets,
        {
          weight: "",
          reps: "",
        },
      ],
    }));

  };

  // REMOVE SET
  const removeSet = (index) => {

    const filteredSets =
      exercise.sets.filter(
        (_, i) => i !== index
      );

    setExercise((prev) => ({
      ...prev,
      sets: filteredSets,
    }));

  };

  // HANDLE SET CHANGE
  const handleSetChange = (
    index,
    field,
    value
  ) => {

    const updatedSets = [...exercise.sets];

    updatedSets[index][field] = value;

    setExercise((prev) => ({
      ...prev,
      sets: updatedSets,
    }));

  };

  // LOADING UI
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f6f8]">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-gray-300 border-t-[#D4F042] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 font-medium">
            Loading Workout...
          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#f5f6f8] py-8">

      <div className="w-11/12 md:w-10/12 mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex gap-5 justify-between">

          <div>

            <p className="text-gray-500 text-sm">
              Training Center
            </p>

            <h1 className="text-4xl font-bold">
              Workout Tracker
            </h1>

          </div>

          <div>

            <p className="text-gray-500">
              Calories Burned
            </p>

            <h1 className="text-4xl font-bold text-end">
              -{workout?.caloriesBurned || 0}
            </h1>

          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm">

            {/* WORKOUT DAY */}
            <h2 className="text-2xl font-bold mb-5">
              Workout Day
            </h2>

            <div className="mb-8">

              <input
                type="text"
                placeholder="Workout Day"
                value={exercise.workoutDay}
                disabled={Boolean(workout)}
                onChange={(e) =>
                  setExercise((prev) => ({
                    ...prev,
                    workoutDay: e.target.value,
                  }))
                }
                className="w-full bg-gray-100 p-3 rounded-2xl outline-none disabled:bg-gray-300"
              />

            </div>

            {/* EXERCISE SECTION */}
            <div className="border-t pt-6">

              <h2 className="text-2xl font-bold mb-5">
                Add Exercise
              </h2>

              {/* INPUTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.workoutName}
                  onChange={(e) =>
                    setExercise((prev) => ({
                      ...prev,
                      workoutName: e.target.value,
                    }))
                  }
                  className="bg-gray-100 p-3 rounded-2xl outline-none"
                />

                <input
                  type="number"
                  placeholder="Duration (mins)"
                  value={exercise.duration}
                  onChange={(e) =>
                    setExercise((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  className="bg-gray-100 p-3 rounded-2xl outline-none"
                />

              </div>

              {/* SETS */}
              <div className="space-y-4">

                <div className="grid grid-cols-4 text-gray-500 px-2">

                  <p>Set</p>

                  <p>Weight</p>

                  <p>Reps</p>

                  <p>Action</p>

                </div>

                {exercise?.sets?.map(
                  (set, index) => (

                    <div
                      key={index}
                      className="grid grid-cols-4 gap-4 items-center bg-gray-50 p-4 rounded-2xl"
                    >

                      <p className="font-semibold">
                        Set {index + 1}
                      </p>

                      <input
                        type="number"
                        placeholder="Weight"
                        value={set.weight}
                        onChange={(e) =>
                          handleSetChange(
                            index,
                            "weight",
                            e.target.value
                          )
                        }
                        className="bg-white border p-3 rounded-xl outline-none"
                      />

                      <input
                        type="number"
                        placeholder="Reps"
                        value={set.reps}
                        onChange={(e) =>
                          handleSetChange(
                            index,
                            "reps",
                            e.target.value
                          )
                        }
                        className="bg-white border p-3 rounded-xl outline-none"
                      />

                      <button
                        onClick={() =>
                          removeSet(index)
                        }
                        disabled={
                          exercise.sets.length === 1
                        }
                        className="bg-red-100 text-red-600 px-3 py-2 rounded-xl disabled:opacity-50"
                      >
                        Remove
                      </button>

                    </div>

                  )
                )}

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-6">

                <button
                  onClick={addSet}
                  className="bg-gray-200 px-5 py-3 rounded-full font-medium hover:scale-105 transition-all"
                >
                  + Add Set
                </button>

                <button
                  onClick={addWorkout}
                  className="bg-[#D4F042] px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all"
                >
                  Log Exercise
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-3xl p-6 shadow-sm h-fit">

            <h2 className="text-2xl font-bold mb-2">
              Today's Workout
            </h2>

            {
              workout?.exercises?.length > 0 ? (
                <>

                  {/* WORKOUT DAY */}
                  <div className="mb-6">

                    <p className="text-gray-500 text-sm">
                      Workout Day
                    </p>

                    <h3 className="text-xl font-bold">
                      {workout?.workoutDay}
                    </h3>

                  </div>

                  {/* TOTAL DURATION */}
                  <div className="mb-6">

                    <p className="text-gray-500 text-sm">
                      Total Duration
                    </p>

                    <h3 className="text-lg font-semibold">
                      {workout?.totalDuration} mins
                    </h3>

                  </div>

                  {/* EXERCISES */}
                  <div className="space-y-4">

                    {workout?.exercises?.map(
                      (item, index) => {

                        const totalVolume =
                          item?.sets?.reduce(
                            (acc, set) =>
                              acc +
                              (
                                set.weight *
                                set.reps
                              ),
                            0
                          );

                        return (

                          <div
                            key={index}
                            className="border rounded-2xl p-4"
                          >

                            <div className="flex justify-between items-center mb-3">

                              <div>

                                <h3 className="font-bold text-lg">
                                  {item?.workoutName}
                                </h3>

                                <p className="text-sm text-gray-500">
                                  {item?.duration} mins
                                </p>

                              </div>

                              <span className="bg-[#D4F042] px-3 py-1 rounded-full text-sm">
                                {item?.sets?.length} Sets
                              </span>

                            </div>

                            <p className="text-sm text-gray-500 mb-3">
                              Volume : {totalVolume} kg
                            </p>

                            {/* SETS */}
                            <div className="space-y-2">

                              {item?.sets?.map(
                                (set, i) => (

                                  <div
                                    key={i}
                                    className="flex justify-between bg-gray-50 p-2 rounded-xl text-sm"
                                  >

                                    <p>
                                      Set {i + 1}
                                    </p>

                                    <p>
                                      {set.weight} kg ×{" "}
                                      {set.reps} reps
                                    </p>

                                  </div>

                                )
                              )}

                            </div>

                          </div>

                        );

                      }
                    )}

                  </div>

                </>
              ) : (

                <p className="text-gray-500">
                  No workouts added today.
                </p>

              )
            }

          </div>

        </div>

      </div>

    </div>

  );

};

export default Workout;