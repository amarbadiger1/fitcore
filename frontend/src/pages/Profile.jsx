import React, { useEffect, useState } from "react";
import API from "../services/api"

const Profile = () => {
  const [userdata, setUserdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
  });


  const fetchUser = async () => {
    try {
      const res = await API.get("user/getme");
      console.log(res.data.user, "hello");
      setUserdata(res.data.user)
    } catch (error) {
      const err = error?.response?.data?.message || "Someting Went Wrong";
      toast.error(err);
    }
  }
  const handleChange = async () => {
    try {
      const onboard = await API.patch("/user/updateprofile", userdata)
      toast.success("updated Completed");
    } catch (error) {
      const err = error?.response?.data?.message || "Someting Went Wrong";
      toast.error(err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])




  return (
    <div className="w-full lg:w-10/12 mx-auto bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4"
          />

          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {userdata?.firstname} {userdata?.lastname}
          </h2>
          <p className="text-gray-500 text-sm">{userdata.email}</p>

          <button className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition w-full sm:w-auto">
            Edit Profile
          </button>
        </div>

        {/* RIGHT: Details */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

            <div>
              <label className="text-sm text-gray-500">Age</label>
              <input
                type="number"
                value={userdata.age}
                onChange={(e) =>
                  setUserdata({ ...userdata, age: Number(e.target.value)})
                }
                className="w-full mt-1 p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Height (cm)</label>
              <input
                type="number"
                value={userdata.height}
                onChange={(e) =>
                  setUserdata({ ...userdata, height: Number(e.target.value )})
                }
                className="w-full mt-1 p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Weight (kg)</label>
              <input
                type="number"
                value={userdata.weight}
                onChange={(e) =>
                  setUserdata({ ...userdata, weight:Number(e.target.value)})
                }
                className="w-full mt-1 p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Goal</label>
              <select
                value={userdata.goal}
                onChange={(e) =>
                  setUserdata({ ...userdata, goal: e.target.value })
                }
                className="w-full mt-1 p-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value={"weight_loss"}>weight_loss</option>
                <option value={"muscle_gain"}>muscle_gain</option>
                <option value={"maintain"}>maintain</option>
              </select>
            </div>

          </div>

          <button className="mt-6 w-full sm:w-auto px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
            onClick={handleChange}
          >
            Save Changes
          </button>
        </div>

        {/* STATS */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Current Weight</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
              {userdata.weight} kg
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Height</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
              {userdata.height} cm
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Goal</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
              {userdata.goal}
            </h3>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;