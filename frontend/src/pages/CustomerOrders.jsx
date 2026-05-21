import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react";

function CustomerOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  // ================= FETCH ORDERS =================

  const fetchOrders = async () => {

    try {

      const customerId = localStorage.getItem("customerId");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/customer-orders/${customerId}/`
      );

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= STATUS DESIGN =================

  const getStatus = (status) => {

    switch (status) {

      case "Pending":
        return {
          color: "bg-yellow-100 text-yellow-700",
          icon: <Clock size={18} />,
        };

      case "Accepted":
        return {
          color: "bg-blue-100 text-blue-700",
          icon: <Package size={18} />,
        };

      case "Shipped":
        return {
          color: "bg-purple-100 text-purple-700",
          icon: <Truck size={18} />,
        };

      case "Delivered":
        return {
          color: "bg-green-100 text-green-700",
          icon: <CheckCircle size={18} />,
        };

      case "Cancelled":
        return {
          color: "bg-red-100 text-red-700",
          icon: <XCircle size={18} />,
        };

      default:
        return {
          color: "bg-gray-100 text-gray-700",
          icon: <Clock size={18} />,
        };
    }
  };

  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      {/* TITLE */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-green-800">
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Track your product orders and delivery status
        </p>

      </div>

      {/* NO ORDERS */}

      {orders.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-sm p-10 text-center">

          <h2 className="text-2xl font-semibold text-gray-700">
            No Orders Found
          </h2>

        </div>

      ) : (

        <div className="grid gap-6">

          {orders.map((order) => {

            // IMPORTANT CHANGE HERE

            const status = getStatus(order.order_status);

            return (

              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  {/* LEFT SIDE */}

                  <div className="flex items-center gap-5">

                    {/* PRODUCT IMAGE */}

                    <img
                      src={order.product_image}
                      alt=""
                      className="w-28 h-28 rounded-2xl object-cover border"
                    />

                    {/* PRODUCT DETAILS */}

                    <div className="space-y-2">

                      <h2 className="text-2xl font-bold text-gray-800">
                        {order.product_name}
                      </h2>

                      <p className="text-gray-500">
                        Quantity :
                        <span className="font-semibold ml-2">
                          {order.quantity}
                        </span>
                      </p>

                      <p className="text-gray-500">
                        Total Price :
                        <span className="font-semibold text-green-700 ml-2">
                          ₹{order.total_price}
                        </span>
                      </p>

                      <p className="text-gray-500">
                        Farmer :
                        <span className="font-semibold ml-2">
                          {order.farmer_name}
                        </span>
                      </p>

                    </div>

                  </div>

                  {/* RIGHT SIDE */}

                  <div className="flex flex-col items-start md:items-end gap-3">

                    {/* STATUS BADGE */}

                    <div
                      className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold ${status.color}`}
                    >

                      {status.icon}

                      {/* IMPORTANT CHANGE HERE */}

                      {order.order_status}

                    </div>

                    <p className="text-sm text-gray-400">
                      Ordered on : {order.created_at}
                    </p>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

}

export default CustomerOrders;