import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, LogIn, LogOut, Menu, X } from "lucide-react";
import bhavanamsLogo from '/Images/logo/logo.png'

const Navbar = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({ to, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setMobileMenuOpen(false)} // Close menu on click
        className={`block px-3 py-2 text-sm font-semibold transition-colors ${isActive
          ? "text-[#2D61A1] border-b-2 border-[#2D61A1]"
          : "text-slate-600 hover:text-[#2D61A1]"
          }`}
      >
        {label}
      </Link>
    );
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={bhavanamsLogo}
              alt="Bhavanam's C2C Logo"
              className="h-[50px] w-[145px]"
            />
          </Link>

          {/* Desktop Nav */}


          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-6">

              <NavLink to="/" label="Store" />
              {isAuthenticated && <NavLink to="/my-courses" label="My Courses" />}
            </div>
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all border border-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2D61A1] flex items-center justify-center text-white shadow-sm">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 hidden sm:inline">
                    Profile
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#0D2A4A] text-white rounded-xl hover:bg-[#1a3a5a] transition-all font-bold shadow-lg shadow-blue-900/10 active:scale-95"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-slate-700 hover:text-[#2D61A1]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-md">
          <div className="flex flex-col px-4 py-4 space-y-2">

            <NavLink to="/store" label="Store" />
            {isAuthenticated && <NavLink to="/my-courses" label="My Courses" />}
            <div className="border-t border-slate-200 mt-2 pt-2 flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 font-semibold"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0D2A4A] text-white rounded-xl hover:bg-[#1a3a5a] transition-all font-bold"
                >
                  <LogIn size={16} /> Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
