import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Home,
  User,
  PlusSquare,
  Package,
  ShoppingBag,
  IndianRupee,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

function FarmerSidebar() 
{
  const [profileImage, setProfileImage] = useState("/farmer.png");
const [farmerName, setFarmerName] = useState("");

const farmerId = localStorage.getItem("farmerId");

useEffect(() => {

  const fetchFarmer = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/farmers/${farmerId}/`
      );

      setFarmerName(res.data.full_name);

      if (res.data.profile_photo) {

        setProfileImage(res.data.profile_photo);

      }

    } catch (err) {

      console.log(err);

    }

  };

  fetchFarmer();

}, []);

  return (
    <div className="w-72 h-screen sticky top-0 bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between overflow-y-auto">

      {/* TOP SECTION */}
      <div>

        {/* PROFILE */}
        <div className="flex flex-col items-center pt-8 pb-6 border-b border-gray-100">
          <img
            src={profileImage}
            alt="Farmer"
            className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
          />

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            Ramesh Kumar
          </h2>

          <span className="mt-2 px-4 py-1 bg-green-100 text-green-700 text-sm rounded-full">
            Verified Farmer
          </span>
        </div>

        {/* MENU */}
        <div className="mt-6 px-4 space-y-2">

          <button className="flex items-center gap-3 w-full bg-green-100 text-green-700 px-4 py-3 rounded-xl font-medium">
            <Home size={20} />
            Dashboard
          </button>

          <Link to="/farmer/profile" className="flex items-center gap-3 w-full hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition"
         >
         <User size={20} />
         My Profile
         </Link>

         <Link to="addproduct">
  <button className="flex items-center gap-3 w-full hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition">
    <PlusSquare size={20} />
    Add Product
  </button>
</Link>

          <button className="flex items-center gap-3 w-full hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition">
            <Package size={20} />
            My Products
          </button>

          <button className="flex items-center gap-3 w-full hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition">
            <ShoppingBag size={20} />
            Orders
          </button>

          <button className="flex items-center gap-3 w-full hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition">
            <IndianRupee size={20} />
            Earnings
          </button>

          <button className="flex items-center gap-3 w-full hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition">
            <MessageSquare size={20} />
            Messages
          </button>

          <button className="flex items-center gap-3 w-full hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition">
            <Bell size={20} />
            Notifications
          </button>

          <button className="flex items-center gap-3 w-full hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl transition">
            <Settings size={20} />
            Settings
          </button>

          <button className="flex items-center gap-3 w-full hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl transition">
            <LogOut size={20} />
            Logout
          </button>

        </div>
      </div>

      {/* SUPPORT CARD */}
      <div className="m-4 bg-green-50 rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Need Help?
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          We are here to help you. Contact our support team.
        </p>

        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition">
          Contact Support
        </button>
      </div>
    </div>
  );
}

export default FarmerSidebar;