import React from "react";
import {
  ShoppingBasket,
  ShoppingBag,
  IndianRupee,
  Eye,
} from "lucide-react";

function FarmerDashboard() {
  return (
    <div className="space-y-6">

      {/* WELCOME CARD */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl p-8 flex items-center justify-between shadow-sm">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back, Ramesh Kumar! 👋
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Here's what's happening with your store today.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition">
          + Add New Product
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* CARD 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
            <ShoppingBasket className="text-green-600" size={28} />
          </div>

          <h2 className="text-gray-500 mt-5">
            Total Products
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            0
          </h1>

          <p className="text-green-600 mt-2 font-medium">
            Active Listings
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
            <ShoppingBag className="text-blue-600" size={28} />
          </div>

          <h2 className="text-gray-500 mt-5">
            Total Orders
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            0
          </h1>

          <p className="text-blue-600 mt-2 font-medium">
            View all orders
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center">
            <IndianRupee className="text-yellow-600" size={28} />
          </div>

          <h2 className="text-gray-500 mt-5">
            Total Earnings
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            ₹0.00
          </h1>

          <p className="text-yellow-600 mt-2 font-medium">
            This Month
          </p>
        </div>

        {/* CARD 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
            <Eye className="text-purple-600" size={28} />
          </div>

          <h2 className="text-gray-500 mt-5">
            Product Views
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            0.00
          </h1>

          <p className="text-purple-600 mt-2 font-medium">
            This Month
          </p>
        </div>
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* SALES OVERVIEW */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Sales Overview
            </h2>

            <select className="border border-gray-200 rounded-xl px-4 py-2 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>

          {/* FAKE GRAPH */}
          <div className="h-80 flex items-end gap-5">

            <div className="bg-green-200 w-full rounded-t-xl h-20"></div>
            <div className="bg-green-300 w-full rounded-t-xl h-36"></div>
            <div className="bg-green-400 w-full rounded-t-xl h-28"></div>
            <div className="bg-green-500 w-full rounded-t-xl h-52"></div>
            <div className="bg-green-400 w-full rounded-t-xl h-40"></div>
            <div className="bg-green-500 w-full rounded-t-xl h-64"></div>
            <div className="bg-green-600 w-full rounded-t-xl h-72"></div>

          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Orders
            </h2>

            <button className="text-green-600 font-semibold">
              View All
            </button>
          </div>

          <div className="space-y-5">

            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Tomato
                </h3>

                <p className="text-gray-500">
                  5 Kg
                </p>
              </div>

              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                Delivered
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Potato
                </h3>

                <p className="text-gray-500">
                  10 Kg
                </p>
              </div>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                Shipped
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  Onion
                </h3>

                <p className="text-gray-500">
                  3 Kg
                </p>
              </div>

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                Pending
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default FarmerDashboard;