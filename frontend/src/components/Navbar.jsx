import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()
    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-black font-semibold"
            : "text-gray-500 hover:text-black transition";

    return (
        <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <h1 className="text-2xl font-semibold cursor-pointer" onClick={() => {
                    navigate("/")
                }} >FitCore</h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <NavLink to="/features" className={navLinkClass}>
                        Features
                    </NavLink>
                    <NavLink to="/workouts" className={navLinkClass}>
                        Workouts
                    </NavLink>
                    <NavLink to="/stories" className={navLinkClass}>
                        Success Stories
                    </NavLink>
                    <NavLink to="/pricing" className={navLinkClass}>
                        Pricing
                    </NavLink>
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-6">
                    <NavLink to="/login" className="text-blue-600 underline">
                        Login
                    </NavLink>

                    <NavLink
                        to="/register"
                        className="py-2 px-6 text-sm font-semibold rounded-full bg-[#D4F042] hover:bg-[#c4e030] transition"
                    >
                        Start Free Trial
                    </NavLink>
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
                <div className={`md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 transform transition-all duration-300 ease-in-out ${menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-5 pointer-events-none"
                    }`}>
                    <NavLink to="/features" className={navLinkClass}>
                        Features
                    </NavLink>
                    <NavLink to="/workouts" className={navLinkClass}>
                        Workouts
                    </NavLink>
                    <NavLink to="/stories" className={navLinkClass}>
                        Success Stories
                    </NavLink>
                    <NavLink to="/pricing" className={navLinkClass}>
                        Pricing
                    </NavLink>

                    <hr />

                    <NavLink to="/login" className="text-blue-600 underline">
                        Login
                    </NavLink>

                    <NavLink
                        to="/register"
                        className="py-2 text-center font-semibold rounded-full bg-[#D4F042]"
                    >
                        Start Free Trial
                    </NavLink>
                </div>
            )}
        </header>
    );
};

export default Navbar;