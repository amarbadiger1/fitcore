import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pricing from "./components/Pricing"
import Features from "./components/Features"
import Workout from "./components/Workout"
import Stories from "./components/Stories"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Prevent content going under navbar */}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<Features />} />
          <Route path="/workouts" element={<Workout />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/pricing" element={<Pricing />} />
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