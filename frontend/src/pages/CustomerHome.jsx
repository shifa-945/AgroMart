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
  localStorage.getItem("customer_id");

const token =
  localStorage.getItem("token");

  // ================= WISHLIST ADDED (ONLY NEW PART) =================
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
    if (!customerId || !token) return;

const res = await axios.get(
  `http://127.0.0.1:8000/api/wishlist/${customerId}/`,
  {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
);

      setWishlist(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const toggleWishlist = async (productId, e) => {
    e.stopPropagation();

    try {
     if (!customerId || !token) {
  alert("Please login first");
  navigate("/customer/login");
  return;
}

await axios.post(
  "http://127.0.0.1:8000/api/wishlist/toggle/",
  {
    customer: Number(customerId),
    product: Number(productId),
  },
  {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
);

      fetchWishlist(); // refresh

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const isLiked = (productId) => {
    return wishlist.some(
      (item) => item.product.id === productId
    );
  };
  // ================================================================

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

     if (!customerId || !token) {
  alert("Please login first");
  navigate("/customer/login");
  return;
}

await axios.post(
  "http://127.0.0.1:8000/api/cart/",
  {
    customer: Number(customerId),
    product_id: productId,
    quantity: 1,
  },
  {
    headers: {
      Authorization: `Token ${token}`,
    },
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

                {/* ❤️ WISHLIST (UPDATED) */}
                <button
                  onClick={(e) =>
                    toggleWishlist(p.id, e)
                  }
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  <Heart
                    size={16}
                    className={
                      isLiked(p.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400"
                    }
                  />
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
<div className="mt-3">

  {p.offer_percentage > 0 ? (

    <>

      <div className="flex items-center gap-2">

        <span className="text-2xl font-bold text-green-700">
          ₹{p.discounted_price}
        </span>

        <span className="text-sm text-gray-400 line-through">
          ₹{p.price}
        </span>

      </div>

      <span className="inline-block mt-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
        {p.offer_percentage}% OFF
      </span>

    </>

  ) : (

    <span className="text-2xl font-bold text-green-700">
      ₹{p.price}
    </span>

  )}

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