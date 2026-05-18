import React, { useEffect, useState } from "react";
import axios from "axios";

function FarmerOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (orderId, status) => {

    try {

      await axios.patch(
        `http://127.0.0.1:8000/api/update-order-status/${orderId}/`,
        {
          status: status
        }
      );
        console.log(response.data);
      fetchOrders();

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH ORDERS
  const fetchOrders = async () => {

    const farmerId = localStorage.getItem("farmerId");

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/farmer-orders/${farmerId}/`
      );
     console.log(response.data);
      setOrders(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Farmer Orders
      </h1>

      <div className="space-y-4">

        {orders.map((order) => (

          <div key={order.id} className="border p-4 rounded shadow bg-white">

            {/* PRODUCT */}
            <h2 className="text-xl font-bold text-green-700">
              {order.product_name || order.product?.name}
            </h2>

            {/* DETAILS */}
            <p><b>Customer:</b> {order.full_name}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Quantity:</b> {order.quantity}</p>
            <p><b>Total:</b> ₹{order.total_price}</p>

            {/* STATUS (IMPORTANT) */}
            <p className="mt-2 text-lg">
              <b>Status:</b>{" "}
              <span className="font-bold text-blue-600">
                {order.order_status}
              </span>
            </p>

            {/* BUTTONS ALWAYS VISIBLE */}
            <div className="flex gap-2 mt-4">

              <button
                onClick={() => updateStatus(order.id, "Accepted")}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(order.id, "Shipped")}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Ship
              </button>

              <button
                onClick={() => updateStatus(order.id, "Delivered")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Deliver
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default FarmerOrders;