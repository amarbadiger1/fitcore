import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  })

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // console.log(data);
      const res = await API.post("/auth/register", data)
      // console.log(res.data);
      setData(prev => ({
        ...prev, firstname: "",
        lastname: "",
        email: "",
        password: ""
      }))
      toast.success(res.data.message)
    } catch (error) {
      const err = error?.response?.data?.message
      // console.log(error?.response);
      toast.error(err);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">

      {/* CONTAINER */}
      <div className="w-full max-w-md sm:max-w-md bg-white rounded-2xl shadow-lg flex overflow-hidden">
        <div className="w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">

          <h2 className="text-xl sm:text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Sign up to get started
          </p>

          {/* FORM */}
          <form className="flex flex-col gap-4" onSubmit={handleClick}>

            {/* FIRST + LAST NAME */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full sm:w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4F042]"
                onChange={(e) => {
                  const val = e.target.value;
                  setData(prev => ({ ...prev, firstname: val }))
                }}
                value={data.firstname}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="w-full sm:w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4F042]"
                onChange={(e) => {
                  const val = e.target.value;
                  setData(prev => ({ ...prev, lastname: val }))
                }}
                value={data.lastname}
              />
            </div>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4F042]"
              onChange={(e) => {
                const val = e.target.value;
                setData(prev => ({ ...prev, email: val }))
              }}
              value={data.email}
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4F042]"
              onChange={(e) => {
                const val = e.target.value;
                setData(prev => ({ ...prev, password: val }))
              }}
              value={data.password}
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#D4F042] font-semibold hover:bg-[#c4e030]"
            >
              Sign Up
            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* SOCIAL */}
          <button className="w-full py-3 border rounded-lg hover:bg-gray-50">
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <span onClick={() => {
              navigate("/login")
            }} className="font-semibold cursor-pointer hover:underline">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;