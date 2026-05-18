import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  ShoppingBasket,
  ShoppingBag,
  IndianRupee,
  Eye,
} from "lucide-react";

function FarmerDashboard() {

  const [totalProducts, setTotalProducts] = useState(0);

  const [farmerName, setFarmerName] = useState("");

  const [totalOrders, setTotalOrders] = useState(0);

  const [totalEarnings, setTotalEarnings] = useState(0);

  const [recentOrders, setRecentOrders] = useState([]);

  const farmerId = localStorage.getItem("farmerId");

  // FETCH DASHBOARD DATA

  useEffect(() => {

    fetchFarmer();

    fetchProducts();

    fetchOrders();

  }, []);

  // FETCH FARMER

  const fetchFarmer = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/farmers/${farmerId}/`
      );

      setFarmerName(res.data.full_name);

    } catch (err) {

      console.log(err);

    }

  };

  // FETCH FARMER PRODUCTS

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/products/?farmer=${farmerId}`
      );

      setTotalProducts(res.data.length);

    } catch (err) {

      console.log(err);

    }

  };

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/farmer-orders/${farmerId}/`
      );

      // TOTAL ORDERS

      setTotalOrders(res.data.length);

      // RECENT ORDERS

      setRecentOrders(res.data);

      // TOTAL EARNINGS

      const total = res.data.reduce(

        (sum, order) =>

          sum + Number(order.total_price),

        0
      );

      setTotalEarnings(total);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="space-y-6">

      {/* WELCOME CARD */}

      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl p-8 flex items-center justify-between shadow-sm">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">

            Welcome back, {farmerName || "Farmer"}! 👋

          </h1>

          <p className="text-gray-600 mt-3 text-lg">

            Here's what's happening with your store today.

          </p>

        </div>

        <Link to="/farmer/addproduct">

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition">

            + Add New Product

          </button>

        </Link>

      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL PRODUCTS */}

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">

            <ShoppingBasket className="text-green-600" size={28} />

          </div>

          <h2 className="text-gray-500 mt-5">

            Total Products

          </h2>

          <h1 className="text-4xl font-bold mt-2">

            {totalProducts}

          </h1>

          <p className="text-green-600 mt-2 font-medium">

            Active Listings

          </p>

        </div>

        {/* TOTAL ORDERS */}

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">

            <ShoppingBag className="text-blue-600" size={28} />

          </div>

          <h2 className="text-gray-500 mt-5">

            Total Orders

          </h2>

          <h1 className="text-4xl font-bold mt-2">

            {totalOrders}

          </h1>

          <p className="text-blue-600 mt-2 font-medium">

            Total Customer Orders

          </p>

        </div>

        {/* TOTAL EARNINGS */}

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center">

            <IndianRupee className="text-yellow-600" size={28} />

          </div>

          <h2 className="text-gray-500 mt-5">

            Total Earnings

          </h2>

          <h1 className="text-4xl font-bold mt-2">

            ₹{totalEarnings}

          </h1>

          <p className="text-yellow-600 mt-2 font-medium">

            Customer Purchases

          </p>

        </div>

        {/* PRODUCT VIEWS */}

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">

            <Eye className="text-purple-600" size={28} />

          </div>

          <h2 className="text-gray-500 mt-5">

            Product Views

          </h2>

          <h1 className="text-4xl font-bold mt-2">

            {totalProducts * 10}

          </h1>

          <p className="text-purple-600 mt-2 font-medium">

            Estimated Views

          </p>

        </div>

      </div>

      {/* RECENT ORDERS SECTION */}

      <div className="grid grid-cols-1 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-gray-800">

              Recent Orders

            </h2>

            <Link to="/farmer/orders">

              <button className="text-green-600 font-semibold">

                View All

              </button>

            </Link>

          </div>

          {/* NO ORDERS */}

          {totalOrders === 0 ? (

            <div className="flex items-center justify-center h-64 text-gray-400">

              No Orders Yet

            </div>

          ) : (

            <div className="space-y-4">

              {recentOrders.map((order) => (

                <div
                  key={order.id}
                  className="border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >

                  {/* LEFT */}

                  <div>

                    <h3 className="text-xl font-bold text-green-700">

                      {order.product_name}

                    </h3>

                    <p className="text-gray-600 mt-1">

                      Customer:
                      <span className="font-semibold">
                        {" "} {order.full_name}
                      </span>

                    </p>

                    <p className="text-gray-600">

                      Phone:
                      <span className="font-semibold">
                        {" "} {order.phone}
                      </span>

                    </p>

                  </div>

                  {/* CENTER */}

                  <div className="flex flex-col gap-1">

                    <p className="text-gray-700">

                      Quantity:
                      <span className="font-bold">
                        {" "} {order.quantity}
                      </span>

                    </p>

                    <p className="text-gray-700">

                      Total:
                      <span className="font-bold text-green-700">
                        {" "} ₹{order.total_price}
                      </span>

                    </p>

                  </div>

                  {/* RIGHT */}

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.order_status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.order_status === "Shipped"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.order_status === "Accepted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >

                      {order.order_status}

                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default FarmerDashboard;