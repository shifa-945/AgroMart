import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Heart,
  ShoppingCart,
  Star,
  Menu,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function CustomerHome() {

  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const navigate = useNavigate();

  const customerId =
    localStorage.getItem("customerId");

  useEffect(() => {

    fetchProducts();

  }, []);

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/products/"
      );

      setProducts(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // ================= ADD TO CART =================

  const handleAddToCart = async (
    productId,
    e
  ) => {

    e.stopPropagation();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        {
          customer: Number(customerId),
          product_id: productId,
          quantity: 1,
        }
      );

      alert("Product added to cart");

    } catch (err) {

      console.log(err.response?.data);

    }

  };

  // ================= CATEGORY LIST =================

  const categories = [
    {
      name: "All",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },

    {
      name: "Vegetables",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
    },

    {
      name: "Fruits",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    },

    {
      name: "Leafy",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    },

    {
      name: "Best",
      image:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    },
  ];

  // ================= FILTER PRODUCTS =================

  const filteredProducts =

    selectedCategory === "All"

      ? products

      : products.filter(
          (p) =>
            p.category === selectedCategory
        );

  return (

    <div className="min-h-screen bg-gray-50">

      {/* ================= MENU BAR ================= */}

      <div className="bg-white shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* LEFT MENU */}

          <div className="flex items-center gap-8">

            <button className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">

              <Menu size={18} />

              Categories

            </button>

            <button
              onClick={() =>
                setSelectedCategory("All")
              }
              className="hover:text-green-700 font-medium"
            >
              Home
            </button>

            <button
              onClick={() =>
                setSelectedCategory("Fruits")
              }
              className="hover:text-green-700 font-medium"
            >
              Fruits
            </button>

            <button
              onClick={() =>
                setSelectedCategory("Vegetables")
              }
              className="hover:text-green-700 font-medium"
            >
              Vegetables
            </button>

            <button
              onClick={() =>
                setSelectedCategory("Leafy")
              }
              className="hover:text-green-700 font-medium"
            >
              Organic
            </button>

          </div>

          {/* RIGHT ICONS */}

          <div className="flex items-center gap-6">

            <Heart className="text-gray-700 cursor-pointer hover:text-red-500" />

            <ShoppingCart
              onClick={() =>
                navigate("/customer/cart")
              }
              className="text-green-700 cursor-pointer hover:text-green-800"
            />

          </div>

        </div>

      </div>

     
      {/* ================= PRODUCTS ================= */}

      <div className="max-w-7xl mx-auto px-4 pb-10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold text-gray-800">

            {selectedCategory} Products

          </h2>

          <button
            onClick={() =>
              setSelectedCategory("All")
            }
            className="text-green-700 font-semibold"
          >
            View All
          </button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

          {filteredProducts.map((p) => (

            <div
              key={p.id}
              onClick={() =>
                navigate(
                  `/customer/product/${p.id}`
                )
              }
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
            >

              {/* IMAGE */}

              <div className="relative">

                <img
                  src={p.image}
                  className="h-52 w-full object-cover"
                  alt={p.name}
                />

                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">

                  <Heart size={16} />

                </button>

              </div>

              {/* CONTENT */}

              <div className="p-4">

                <h3 className="font-bold text-lg text-gray-800 truncate">

                  {p.name}

                </h3>

                <p className="text-sm text-gray-500 mt-1">

                  {p.category}

                </p>

                <div className="flex justify-between items-center mt-3">

                  <span className="text-2xl font-bold text-green-700">

                    ₹{p.price}

                  </span>

                  <span className="text-sm text-gray-400 line-through">

                    ₹{p.price + 20}

                  </span>

                </div>

                <div className="flex items-center gap-1 mt-2">

                  <Star
                    size={15}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm text-gray-600">

                    4.5

                  </span>

                </div>

                {/* ADD TO CART */}

                <button

                  onClick={(e) =>
                    handleAddToCart(
                      p.id,
                      e
                    )
                  }

                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
                >

                  <ShoppingCart size={16} />

                  Add To Cart

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default CustomerHome;