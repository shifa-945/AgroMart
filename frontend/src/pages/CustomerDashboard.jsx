import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/",
        {
          headers: token
            ? {
                Authorization: `Token ${token}`,
              }
            : {},
        }
      );

      setProducts(response.data || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleAddToCart = async (productId) => {
  try {
    const customerId = localStorage.getItem("customer_id");
    const token = localStorage.getItem("token");

    if (!customerId || !token) {
      alert("Please login first");
      navigate("/customer/login");
      return;
    }

    await axios.post(
      "http://127.0.0.1:8000/api/cart/",
      {
        customer: Number(customerId),
        product_id: Number(productId),
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    alert("Product Added To Cart");
    navigate("/customer/cart");

  } catch (err) {
    console.log(err.response?.data || err);
    alert("Failed to add cart");
  }
};
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
      name: "Fresh Vegetables",
      image:
        "https://images.unsplash.com/photo-1610348725531-843dff563e2c",
    },
    {
      name: "Best Selling",
      image:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : selectedCategory === "Fresh Vegetables"
      ? products.filter((p) => p.category === "Vegetables")
      : products.filter((p) => p.category === selectedCategory);

  const vegetables = products.filter((p) => p.category === "Vegetables");
  const fruits = products.filter((p) => p.category === "Fruits");

  return (
    <div className="min-h-screen bg-gray-100">
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

            <button
              onClick={() => navigate("/customer/home")}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
            >
              Shop Now
            </button>
          </div>

          <img
            src="https://img.freepik.com/premium-photo/grocery-shopping-with-cart-full-fresh-vegetables-fruits_952161-104184.jpg"
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
              onClick={() => setSelectedCategory(category.name)}
              className="min-w-[150px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-6 text-center cursor-pointer"
            >
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4">
                <img
                  src={category.image}
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

      {/* ALL PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedCategory}
          </h2>

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
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <Link to={`/customer/product/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    className="w-full h-52 object-cover"
                  />
                </div>
              </Link>

              <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm">
                  {product.category}
                </p>
                <div className="mt-2">
  {product.offer_percentage > 0 ? (
    <>
      <div className="flex items-center gap-2">
        <span className="text-green-700 font-bold text-lg">
          ₹{product.discounted_price}
        </span>

        <span className="text-gray-400 line-through text-sm">
          ₹{product.price}
        </span>
      </div>

      <span className="inline-block mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
        {product.offer_percentage}% OFF
      </span>
    </>
  ) : (
    <span className="text-green-700 font-bold">
      ₹{product.price}
    </span>
  )}
</div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product.id);
                  }}
                  className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VEGETABLES */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Fresh Vegetables
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {vegetables.map((product) => (
            <Link
  key={product.id}
  to={`/customer/product/${product.id}`}
>
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <img
                src={product.image}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm">
                  {product.category}
                </p>
                <div className="mt-2">
  {product.offer_percentage > 0 ? (
    <>
      <div className="flex items-center gap-2">
        <span className="text-green-700 font-bold text-lg">
          ₹{product.discounted_price}
        </span>

        <span className="text-gray-400 line-through text-sm">
          ₹{product.price}
        </span>
      </div>

      <span className="inline-block mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
        {product.offer_percentage}% OFF
      </span>
    </>
  ) : (
    <span className="text-green-700 font-bold">
      ₹{product.price}
    </span>
  )}
</div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product.id);
                  }}
                  className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add To Cart
                </button>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FRUITS */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Fresh Fruits
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {fruits.map((product) => (
           <Link
  key={product.id}
  to={`/customer/product/${product.id}`}
>
  
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <img
                src={product.image}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm">
                  {product.category}
                </p>
                <div className="mt-2">
  {product.offer_percentage > 0 ? (
    <>
      <div className="flex items-center gap-2">
        <span className="text-green-700 font-bold text-lg">
          ₹{product.discounted_price}
        </span>

        <span className="text-gray-400 line-through text-sm">
          ₹{product.price}
        </span>
      </div>

      <span className="inline-block mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
        {product.offer_percentage}% OFF
      </span>
    </>
  ) : (
    <span className="text-green-700 font-bold">
      ₹{product.price}
    </span>
  )}
</div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product.id);
                  }}
                  className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  
                  <ShoppingCart size={18} />
                  Add To Cart
                </button>
              </div>
            </div>
            </Link>
            
          ))}
          
        </div>
      </div>
    </div>

  );
}

export default CustomerDashboard;