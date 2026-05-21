import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Menu,
  Heart,
  ShoppingCart,
  User,
} from "lucide-react";

import { Link,useNavigate } from "react-router-dom";

function CustomerCart() {

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const customerId =
    localStorage.getItem("customerId");

  // ================= FETCH CART =================

  useEffect(() => {

    fetchCart();

  }, []);

  const fetchCart = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/cart/?customer=${customerId}`
      );

      console.log(res.data);

      setCartItems(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // ================= REMOVE ITEM =================

  const removeItem = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/cart/${id}/`
      );

      fetchCart();

    } catch (err) {

      console.log(err);

    }

  };

  // ================= TOTAL PRICE =================

  const totalPrice = cartItems.reduce(

    (total, item) =>

      total +

      (
        item.product
          ? item.quantity *
            Number(item.product.price)
          : 0
      ),

    0
  );

  return (

    <div className="bg-gray-50 min-h-screen">

     

      {/* ================= CART SECTION ================= */}

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* TITLE */}

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-4xl font-bold text-green-700">
            My Cart
          </h1>

          <button
            onClick={() =>
              navigate("/customer/home")
            }
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
          >
            Continue Shopping
          </button>

        </div>

        {/* EMPTY CART */}

        {cartItems.filter(item => item.product).length === 0 && (

          <div className="bg-white rounded-3xl shadow-sm p-14 text-center">

            <h2 className="text-3xl font-bold text-gray-600">

              Your Cart is Empty

            </h2>

            <p className="text-gray-400 mt-3">

              Add fresh farm products to your cart

            </p>

          </div>

        )}

        {/* CART ITEMS */}

        <div className="space-y-6">

          {cartItems

            .filter((item) => item.product)

            .map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition p-5 flex flex-col md:flex-row gap-6"
              >

                {/* IMAGE */}

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full md:w-40 h-40 object-cover rounded-2xl"
                />

                {/* DETAILS */}

                <div className="flex-1 flex flex-col justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                      {item.product.name}

                    </h2>

                    <p className="text-gray-500 mt-2">

                      {item.product.category}

                    </p>

                    <p className="text-lg text-gray-600 mt-3">

                      Price :
                      <span className="font-bold text-black ml-2">

                        ₹{item.product.price}

                      </span>

                    </p>

                    <p className="text-lg text-gray-600 mt-2">

                      Quantity :
                      <span className="font-bold text-black ml-2">

                        {item.quantity}

                      </span>

                    </p>

                    <p className="text-2xl font-bold text-green-700 mt-4">

                      Total :
                      ₹
                      {item.quantity *
                        Number(item.product.price)}

                    </p>

                  </div>

                </div>

                {/* ACTION BUTTONS */}

                <div className="flex flex-col justify-between gap-4">

                  <button
                    onClick={() =>
                      navigate(
                        `/customer/product/${item.product.id}`
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
                  >
                    View Product
                  </button>

                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

        </div>

        {/* GRAND TOTAL */}

        {cartItems.filter(item => item.product).length > 0 && (

          <div className="bg-white rounded-3xl shadow-sm p-8 mt-10">

            <div className="flex items-center justify-between">

              <h2 className="text-3xl font-bold text-gray-800">

                Grand Total

              </h2>

              <h2 className="text-4xl font-bold text-green-700">

                ₹{totalPrice}

              </h2>

            </div>

            <button
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-bold"
            >

              Proceed To Checkout

            </button>

          </div>

        )}

      </div>

    </div>

  );

}

export default CustomerCart;