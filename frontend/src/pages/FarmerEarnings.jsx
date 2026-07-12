import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IndianRupee,
  Package,
  ShoppingBag,
} from "lucide-react";

function FarmerEarnings() {

  const [orders, setOrders] = useState([]);

  const [totalEarnings, setTotalEarnings] = useState(0);

 const farmerId = localStorage.getItem("farmer_id");

  useEffect(() => {

    fetchEarnings();

  }, []);

  // FETCH EARNINGS

  const fetchEarnings = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `http://127.0.0.1:8000/api/farmer-orders/${farmerId}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    setOrders(res.data);

    // TOTAL EARNINGS

    const total = res.data.reduce(

      (sum, order) =>

        sum + Number(order.total_price),

      0
    );

    setTotalEarnings(total);

  } catch (err) {

    console.log(err.response?.data);

  }

};
  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-3xl p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold">

          Farmer Earnings 💰

        </h1>

        <p className="mt-2 text-green-100 text-lg">

          Track your product sales and customer purchases.

        </p>

      </div>

      {/* TOTAL CARD */}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL EARNINGS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

            <IndianRupee
              className="text-green-700"
              size={30}
            />

          </div>

          <h2 className="text-gray-500 mt-5">

            Total Earnings

          </h2>

          <h1 className="text-4xl font-bold text-green-700 mt-2">

            ₹{totalEarnings}

          </h1>

          <p className="text-green-600 mt-2 font-medium">

            Total Revenue From Orders

          </p>

        </div>

        {/* TOTAL ORDERS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

            <ShoppingBag
              className="text-blue-700"
              size={30}
            />

          </div>

          <h2 className="text-gray-500 mt-5">

            Total Orders

          </h2>

          <h1 className="text-4xl font-bold text-blue-700 mt-2">

            {orders.length}

          </h1>

          <p className="text-blue-600 mt-2 font-medium">

            Customer Purchases

          </p>

        </div>

        {/* PRODUCTS SOLD */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">

            <Package
              className="text-yellow-700"
              size={30}
            />

          </div>

          <h2 className="text-gray-500 mt-5">

            Products Sold

          </h2>

          <h1 className="text-4xl font-bold text-yellow-700 mt-2">

            {
              orders.reduce(
                (sum, order) =>
                  sum + Number(order.quantity),
                0
              )
            }

          </h1>

          <p className="text-yellow-600 mt-2 font-medium">

            Total Quantity Sold

          </p>

        </div>

      </div>

      {/* EARNINGS TABLE */}

      <div className="mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold text-gray-800">

            Earnings Details

          </h2>

        </div>

        {/* TABLE */}

        {orders.length === 0 ? (

          <div className="p-16 text-center text-gray-400 text-lg">

            No Earnings Yet

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-green-50">

                <tr>

                  <th className="text-left px-6 py-4 text-gray-700">

                    Product

                  </th>

                  <th className="text-left px-6 py-4 text-gray-700">

                    Customer

                  </th>

                  <th className="text-left px-6 py-4 text-gray-700">

                    Quantity

                  </th>

                  <th className="text-left px-6 py-4 text-gray-700">

                    Total Amount

                  </th>

                  <th className="text-left px-6 py-4 text-gray-700">

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50"
                  >

                    {/* PRODUCT */}

                    <td className="px-6 py-5 font-semibold text-gray-800">

                      {order.product_name}

                    </td>

                    {/* CUSTOMER */}

                    <td className="px-6 py-5 text-gray-600">

                      {order.full_name}

                    </td>

                    {/* QUANTITY */}

                    <td className="px-6 py-5 text-gray-600">

                      {order.quantity}

                    </td>

                    {/* AMOUNT */}

                    <td className="px-6 py-5 font-bold text-green-700">

                      ₹{order.total_price}

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">

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

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}

export default FarmerEarnings;