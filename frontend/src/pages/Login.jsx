import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", data);
      toast.success(res.data.message);
    } catch (error) {
      const err = error?.response?.data?.message;
      toast.error(err);
    }
  }


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">

      {/* CONTAINER */}
      <div className="w-full max-w-md sm:max-w-md bg-white rounded-2xl shadow-lg flex overflow-hidden">

        {/* FORM */}
        <div className="w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">

          <h2 className="text-xl sm:text-2xl font-bold mb-2">Sign in</h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Enter your credentials to continue
          </p>

          {/* FORM */}
          <form onSubmit={handleClick} className="flex flex-col gap-4">

            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => {
                const val = e.target.value;
                setData(prev => ({ ...prev, email: val }))
              }}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4F042]"
            />

            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => {
                const val = e.target.value;
                setData(prev => ({ ...prev, password: val }))
              }}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4F042]"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="text-gray-500 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#D4F042] font-semibold hover:bg-[#c4e030]"
            >
              Sign In
            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* SOCIAL LOGIN */}
          <button className="w-full py-3 border rounded-lg hover:bg-gray-50">
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                navigate("/register")
              }}
              className="font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;