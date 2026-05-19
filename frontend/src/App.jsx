import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pricing from "./components/Pricing"
import Features from "./components/Features"
import Stories from "./components/Stories"
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Nutrition from "./pages/Nutrition";
import Workouts from "./components/Workouts";
import Workout from "./pages/Workout";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import API from "./services/api";
import { useDispatch } from "react-redux";
import { setUser } from "./store/features/userSlice"
import EditProfile from "./pages/EditProfile";

const App = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const dispatch = useDispatch()

  const getUser = async () => {
    try {
      const res = await API.get("/user/getme");
      dispatch(setUser(res.data.user));
    } catch (error) {
      const err = error?.response?.data?.message;
      console.log(error);
    }
  }

  useEffect(() => {
    getUser()
  }, [])



  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

      {/* Prevent content going under navbar */}
      <div className="">
        <Routes>
          {/* Public */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route path="/register" element={<Register setIsAuth={setIsAuth} />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/workouts" element={<Workouts />} />

          {/* Protected Group */}
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/workout" element={<Workout />} />
          </Route>

        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
};

export default App;