import React, { useEffect, useState } from "react";
import axios from "axios";

function FarmerOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  // ================= UPDATE STATUS =================

  const updateStatus = async (orderId, status) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.patch(
        `http://127.0.0.1:8000/api/update-order-status/${orderId}/`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      alert("Status Updated");

      fetchOrders();

    } catch (error) {

      console.log(error.response?.data);

    }

  };

  // ================= FETCH ORDERS =================

  const fetchOrders = async () => {

    try {

      const farmerId =
        localStorage.getItem("farmer_id");

      const token =
        localStorage.getItem("token");

      if (!farmerId || !token) {

        return;

      }

      const response = await axios.get(
        `http://127.0.0.1:8000/api/farmer-orders/${farmerId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log(response.data);

      setOrders(response.data);

    } catch (error) {

      console.log(error.response?.data);

    }

  };

  return (

    <div className="p-10">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-6">
        Farmer Orders
      </h1>

      {/* ORDERS */}

      <div className="space-y-4">

        {orders.map((order) => (

          <div
            key={order.id}
            className="border p-5 rounded-2xl shadow bg-white"
          >

            {/* PRODUCT */}

            <h2 className="text-2xl font-bold text-green-700">
              {order.product_name}
            </h2>

            {/* DETAILS */}

            <div className="mt-4 space-y-2">

              <p>
                <b>Customer:</b> {order.full_name}
              </p>

              <p>
                <b>Phone:</b> {order.phone}
              </p>

              <p>
                <b>Quantity:</b> {order.quantity}
              </p>

              <p>
                <b>Total:</b> ₹{order.total_price}
              </p>

              <p>
                <b>Payment:</b> {order.payment_method}
              </p>

              <p>
                <b>Address:</b> {order.address}
              </p>

            </div>

            {/* STATUS */}

            <div className="mt-4">

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  order.order_status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.order_status === "Shipped"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >

                {order.order_status}

              </span>

            </div>

            {/* STATUS BUTTONS */}

            <div className="flex gap-3 mt-4">

              {/* SHIP BUTTON */}

              {order.order_status !== "Shipped" &&
               order.order_status !== "Delivered" && (

                <button
                  onClick={() =>
                    updateStatus(order.id, "Shipped")
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Ship Order
                </button>

              )}

              {/* DELIVER BUTTON */}

              {order.order_status !== "Delivered" && (

                <button
                  onClick={() =>
                    updateStatus(order.id, "Delivered")
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Deliver Order
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default FarmerOrders;