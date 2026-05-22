import React from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Menu,
  Heart,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";

function CustomerMenu({ setSelectedCategory }) {

  const navigate = useNavigate();

  // LOGOUT FUNCTION
  const handleLogout = () => {

    localStorage.removeItem("customerId");

    alert("Logout successful");

    navigate("/customerlogin");

  };

  return (

    <div className="bg-gray-50">

      {/* ================= MENU BAR ================= */}

      <div className="bg-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* LEFT MENU */}

          <div className="flex items-center gap-8">

            {/* CATEGORIES */}
            <button
              onClick={() => navigate("/customer/dashboard")}
              className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Menu size={18} />
              Categories
            </button>

            {/* HOME */}
            <button
              onClick={() => navigate("/customer/home")}
              className="hover:text-green-700 font-medium"
            >
              Home
            </button>

            {/* 🍎 FRUITS FILTER */}
            <button
              onClick={() => {
                if (setSelectedCategory) {
                  setSelectedCategory("Fruits");
                }
                navigate("/customer/home");
              }}
              className="hover:text-green-700 font-medium"
            >
              Fruits
            </button>

            {/* 🥕 VEGETABLES FILTER */}
            <button
              onClick={() => {
                if (setSelectedCategory) {
                  setSelectedCategory("Vegetables");
                }
                navigate("/customer/home");
              }}
              className="hover:text-green-700 font-medium"
            >
              Vegetables
            </button>

            {/* 🟢 ALL PRODUCTS */}
            <button
              onClick={() => {
                if (setSelectedCategory) {
                  setSelectedCategory("All");
                }
                navigate("/customer/home");
              }}
              className="hover:text-green-700 font-medium"
            >
              All
            </button>

          </div>

          {/* RIGHT ICONS */}

          <div className="flex items-center gap-6">

            {/* ❤️ WISHLIST */}
            <Link to="/customer/wishlist">
              <Heart className="text-gray-700 cursor-pointer hover:text-red-500" />
            </Link>

            {/* 🛒 CART */}
            <ShoppingCart
              onClick={() => navigate("/customer/cart")}
              className="text-green-700 cursor-pointer hover:text-green-800"
            />

            {/* USER */}
            <Link to="/customer/orders">
              <User className="w-6 h-6 text-green-700 cursor-pointer" />
            </Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default CustomerMenu;