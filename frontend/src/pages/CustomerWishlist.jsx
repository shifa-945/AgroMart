import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerWishlist() {

  const [items, setItems] = useState([]);

  // ✅ ADDED
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const customerId = localStorage.getItem("customerId");

      const res = await axios.get(
        `http://127.0.0.1:8000/api/wishlist/${customerId}/`
      );

      console.log(res.data);

      setItems(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">

      {items.length === 0 ? (

        <p className="text-center col-span-3 text-gray-500">
          No wishlist items found
        </p>

      ) : (

        items.map((item) => (

          // ✅ CLICKABLE CARD ADDED
          <div
            key={item.id}
            onClick={() =>
              navigate(`/customer/product/${item.product.id}`)
            }
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
          >

            {/* PRODUCT IMAGE */}
            <img
              src={`http://127.0.0.1:8000${item.product.image}`}
              className="h-52 w-full object-contain rounded-xl bg-gray-100"
              alt={item.product.name}
            />

            {/* PRODUCT NAME */}
            <h2 className="font-bold mt-4 text-lg text-gray-800">
              {item.product.name}
            </h2>

            {/* PRODUCT CATEGORY */}
            <p className="text-sm text-gray-500 mt-1">
              {item.product.category}
            </p>

            {/* PRODUCT PRICE */}
            <p className="text-green-600 font-bold text-xl mt-2">
              ₹{item.product.price}
            </p>

          </div>

        ))

      )}

    </div>

  );
}

export default CustomerWishlist;