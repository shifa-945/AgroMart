import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Heart,
  ShoppingCart,
  Star,
  Menu,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function CustomerDashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // ✅ CATEGORY FILTER STATE
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ✅ ADD TO CART FUNCTION
  const handleAddToCart = async (productId) => {

    try {

      const customerId = localStorage.getItem("customerId");

      if (!customerId) {

        alert("Please login first");

        return;

      }

      await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        {
          customer: Number(customerId),
          product: Number(productId),
          quantity: 1,
        }
      );

      alert("Product Added To Cart");

      // ✅ GO TO CART PAGE
      navigate("/customer/cart");

    } catch (err) {

      console.log(err.response?.data || err);

      alert("Failed to add cart");

    }

  };

  // CATEGORY LIST
  const categories = [
    {
      name: "All",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },
    {
      name: "Vegetables",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
    },
    {
      name: "Fruits",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    },
    {
      name: "Fresh Vegetables",
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c",
    },
    {
      name: "Best Selling",
      image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    },
  ];

  // ✅ FILTER PRODUCTS
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : selectedCategory === "Fresh Vegetables"
      ? products.filter(
          (p) => p.category === "Vegetables"
        )
      : products.filter(
          (p) => p.category === selectedCategory
        );

  // FILTERS
  const vegetables = products.filter(
    (p) => p.category === "Vegetables"
  );

  const fruits = products.filter(
    (p) => p.category === "Fruits"
  );

  return (

    <div className="min-h-screen bg-gray-100">

      {/* MENU BAR */}
      <div className="bg-white shadow-md">

        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-8">

            <button className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Menu size={18} />
              Categories
            </button>

            <Link
              to="/customer/home"
              className="hover:text-green-700 font-medium"
            >
              Home
            </Link>

            <button
              onClick={() => setSelectedCategory("Fruits")}
              className="hover:text-green-700 font-medium"
            >
              Fruits
            </button>

            <button
              onClick={() => setSelectedCategory("Vegetables")}
              className="hover:text-green-700 font-medium"
            >
              Vegetables
            </button>

            <button
              onClick={() =>
                setSelectedCategory("Fresh Vegetables")
              }
              className="hover:text-green-700 font-medium"
            >
              Organic
            </button>

          </div>

          <div className="flex items-center gap-6">

            <Heart className="text-gray-700 cursor-pointer hover:text-red-500" />

            {/* ✅ CART ICON NAVIGATION */}
            <ShoppingCart
              onClick={() => navigate("/customer/cart")}
              className="text-gray-700 cursor-pointer hover:text-green-600"
            />

          </div>

        </div>
      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="bg-green-100 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-10">

          <div>

            <h1 className="text-5xl font-bold text-green-900 leading-tight">
              Farm Fresh <br />
              Fruits & Vegetables
            </h1>

            <p className="mt-5 text-lg text-gray-700">
              Direct from farmers to your home.
            </p>

            {/* ✅ SHOP NOW GOES TO HOME PAGE */}
            <button
              onClick={() => navigate("/customer/home")}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
            >
              Shop Now
            </button>

          </div>

          <img
            src="https://img.freepik.com/premium-photo/grocery-shopping-with-cart-full-fresh-vegetables-fruits_952161-104184.jpg"
            alt="Fresh Products"
            className="w-full md:w-[500px] h-[300px] object-cover rounded-3xl mt-8 md:mt-0"
          />

        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Shop By Categories
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4">

          {categories.map((category, index) => (

            <div
              key={index}
              onClick={() =>
                setSelectedCategory(category.name)
              }
              className="min-w-[150px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-6 text-center cursor-pointer"
            >

              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />

              </div>

              <h3 className="font-semibold text-gray-700">
                {category.name}
              </h3>

            </div>

          ))}

        </div>
      </div>

      {/* ✅ FILTERED PRODUCTS SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            {selectedCategory}
          </h2>

          {/* ✅ VIEW ALL */}
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-green-700 font-semibold"
          >
            View All
          </button>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {filteredProducts.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
            >

              <Link to={`/customer/product/${product.id}`}>

                <div className="relative">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover"
                  />

                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                    <Heart size={16} />
                  </button>

                </div>

              </Link>

              <div className="p-4">

                <h3 className="font-bold text-lg text-gray-800">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {product.category}
                </p>

                <div className="flex items-center gap-3 mt-3">

                  <span className="text-2xl font-bold text-green-700">
                    ₹{product.price}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.price + 20}
                  </span>

                </div>

                <div className="flex items-center gap-1 mt-3">

                  <Star
                    size={15}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm text-gray-600">
                    4.5
                  </span>

                </div>

                {/* ✅ ADD TO CART */}
                <button
                  onClick={(e) => {

                    e.preventDefault();

                    e.stopPropagation();

                    handleAddToCart(product.id);

                  }}
                  className="w-full mt-4 border border-green-600 text-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-white transition flex items-center justify-center gap-2"
                >

                  <ShoppingCart size={18} />
                  Add To Cart

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* FRESH VEGETABLES */}
      <div className="max-w-7xl mx-auto px-6 pb-16">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Fresh Vegetables
          </h2>

          {/* ✅ VIEW ALL VEGETABLES */}
          <button
            onClick={() =>
              setSelectedCategory("Vegetables")
            }
            className="text-green-700 font-semibold"
          >
            View All
          </button>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {vegetables.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
            >

              <Link to={`/customer/product/${product.id}`}>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />

              </Link>

              <div className="p-4">

                <h3 className="font-bold text-lg text-gray-800">
                  {product.name}
                </h3>

                <p className="text-green-700 text-2xl font-bold mt-2">
                  ₹{product.price}
                </p>

                <button
                  onClick={(e) => {

                    e.preventDefault();

                    e.stopPropagation();

                    handleAddToCart(product.id);

                  }}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >

                  <ShoppingCart size={18} />
                  Add To Cart

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* FRESH FRUITS */}
      <div className="max-w-7xl mx-auto px-6 pb-16">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Fresh Fruits
          </h2>

          {/* ✅ VIEW ALL FRUITS */}
          <button
            onClick={() =>
              setSelectedCategory("Fruits")
            }
            className="text-green-700 font-semibold"
          >
            View All
          </button>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {fruits.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
            >

              <Link to={`/customer/product/${product.id}`}>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />

              </Link>

              <div className="p-4">

                <h3 className="font-bold text-lg text-gray-800">
                  {product.name}
                </h3>

                <p className="text-green-700 text-2xl font-bold mt-2">
                  ₹{product.price}
                </p>

                <button
                  onClick={(e) => {

                    e.preventDefault();

                    e.stopPropagation();

                    handleAddToCart(product.id);

                  }}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >

                  <ShoppingCart size={18} />
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

export default CustomerDashboard;