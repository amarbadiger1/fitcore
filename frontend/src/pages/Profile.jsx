import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {

  const user = useSelector((state) => state.user.data);

  const [userdata, setUserdata] = useState({
    firstname: "",
    lastname: "",
    profilePic: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    goal: "",
    activityLevel: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {

    if (user) {

      setUserdata({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        profilePic: user.profilePic || "",
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        gender: user.gender || "",
        goal: user.goal || "",
        activityLevel: user.activityLevel || "",
      });

      setPreviewImage(
        user.profilePic ||
        "https://cutiedp.com/wp-content/uploads/2025/08/no-dp-image-1.webp"
      );
    }

  }, [user]);

  // IMAGE CHANGE
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setUserdata({
      ...userdata,
      profilePic: file,
    });

    setPreviewImage(URL.createObjectURL(file));
  };

  // INPUT CHANGE
  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setUserdata({
      ...userdata,
      [name]: value,
    });
  };

  // UPDATE PROFILE
  const handleChange = async () => {

    try {

      const formData = new FormData();

      formData.append("firstname", userdata.firstname);
      formData.append("lastname", userdata.lastname);
      formData.append("age", userdata.age);
      formData.append("height", userdata.height);
      formData.append("weight", userdata.weight);
      
      if (userdata.gender) {
        formData.append("gender", userdata.gender);
      }

      if (userdata.goal) {
        formData.append("goal", userdata.goal);
      }

      if (userdata.activityLevel) {
        formData.append(
          "activityLevel",
          userdata.activityLevel
        );
      }

      // SEND IMAGE ONLY IF NEW FILE
      if (userdata.profilePic instanceof File) {

        formData.append(
          "profilePic",
          userdata.profilePic
        );
      }

      const response = await API.patch(
        "/user/updateprofile",
        formData
      );

      console.log(response.data);

      toast.success(
        "Profile Updated Successfully"
      );

    } catch (error) {

      console.log(error);

      const err =
        error?.response?.data?.message ||
        "Something Went Wrong";

      toast.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] py-6">

      <div className="w-11/12 lg:w-10/12 mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT PROFILE CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">

            <img
              src={previewImage}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
            />

            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              {userdata.firstname} {userdata.lastname}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {user?.email}
            </p>

            {/* IMAGE INPUT */}
            <div className="w-full mt-5">

              <label className="text-sm text-gray-500">
                Profile Picture
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* FIRSTNAME */}
              <div>
                <label className="text-sm text-gray-500">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstname"
                  value={userdata.firstname}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* LASTNAME */}
              <div>
                <label className="text-sm text-gray-500">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastname"
                  value={userdata.lastname}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* AGE */}
              <div>
                <label className="text-sm text-gray-500">
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  value={userdata.age}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* HEIGHT */}
              <div>
                <label className="text-sm text-gray-500">
                  Height (cm)
                </label>

                <input
                  type="number"
                  name="height"
                  value={userdata.height}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* WEIGHT */}
              <div>
                <label className="text-sm text-gray-500">
                  Weight (kg)
                </label>

                <input
                  type="number"
                  name="weight"
                  value={userdata.weight}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* GENDER */}
              <div>
                <label className="text-sm text-gray-500">
                  Gender
                </label>

                <select
                  name="gender"
                  value={userdata.gender}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="male">
                    male
                  </option>

                  <option value="female">
                    female
                  </option>
                </select>
              </div>

              {/* GOAL */}
              <div>
                <label className="text-sm text-gray-500">
                  Goal
                </label>

                <select
                  name="goal"
                  value={userdata.goal}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">
                    Select Goal
                  </option>

                  <option value="weight_loss">
                    weight_loss
                  </option>

                  <option value="muscle_gain">
                    muscle_gain
                  </option>

                  <option value="maintain">
                    maintain
                  </option>
                </select>
              </div>

              {/* ACTIVITY LEVEL */}
              <div>
                <label className="text-sm text-gray-500">
                  Activity Level
                </label>

                <select
                  name="activityLevel"
                  value={userdata.activityLevel}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">
                    Select Activity
                  </option>

                  <option value="low">
                    low
                  </option>

                  <option value="medium">
                    medium
                  </option>

                  <option value="high">
                    high
                  </option>
                </select>
              </div>
            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={handleChange}
              className="mt-8 w-full sm:w-auto px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Save Changes
            </button>
          </div>

          {/* STATS */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

              <p className="text-sm text-gray-500">
                Current Weight
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {userdata.weight} kg
              </h3>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

              <p className="text-sm text-gray-500">
                Height
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {userdata.height} cm
              </h3>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

              <p className="text-sm text-gray-500">
                Goal
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2 capitalize">
                {userdata.goal?.replace("_", " ")}
              </h3>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

              <p className="text-sm text-gray-500">
                Activity
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-2 capitalize">
                {userdata.activityLevel}
              </h3>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;