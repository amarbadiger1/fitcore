import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ isAuth, setIsAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-black font-semibold"
      : "text-gray-500 hover:text-black transition";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("onBoarding");
    setIsAuth(false);
    navigate("/");
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <h1
          className="text-2xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          FitCore
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">

          {/* 🔓 Logged OUT */}
          {!isAuth && (
            <>
              <NavLink to="/features" className={navLinkClass}>
                Features
              </NavLink>
              <NavLink to="/workouts" className={navLinkClass}>
                Workouts
              </NavLink>
              <NavLink to="/stories" className={navLinkClass}>
                Stories
              </NavLink>
              <NavLink to="/pricing" className={navLinkClass}>
                Pricing
              </NavLink>
            </>
          )}

          {/* 🔐 Logged IN */}
          {isAuth && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/nutrition" className={navLinkClass}>
                Nutrition
              </NavLink>
              <NavLink to="/workout" className={navLinkClass}>
                Workout
              </NavLink>
              <NavLink to="/progress" className={navLinkClass}>
                Progress
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            </>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-6">
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="text-blue-600 underline">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="py-2 px-6 text-sm font-semibold rounded-full bg-[#D4F042]"
              >
                Start Free Trial
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">

          {/* 🔓 Logged OUT */}
          {!isAuth && (
            <>
              <NavLink to="/features">Features</NavLink>
              <NavLink to="/workouts">Workouts</NavLink>
              <NavLink to="/stories">Stories</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>

              <hr />

              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Start Free Trial</NavLink>
            </>
          )}

          {/* 🔐 Logged IN */}
          {isAuth && (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/nutrition">Nutrition</NavLink>
              <NavLink to="/workout">Workout</NavLink>
              <NavLink to="/progress">Progress</NavLink>
              <NavLink to="/profile">Profile</NavLink>

              <button onClick={handleLogout} className="text-red-500 text-left">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;