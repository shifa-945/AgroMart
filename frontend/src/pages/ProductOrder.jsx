import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductOrder() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [orderData, setOrderData] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    payment_method: "Cash on Delivery",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/products/${id}/`
      );

      setProduct(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  const handleChange = (e) => {

    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });

  };

  const handlePlaceOrder = async () => {

  try {

    if (!product) {

      alert("Product not loaded");

      return;

    }

    const customerId =
      localStorage.getItem("customer_id");

    const token =
      localStorage.getItem("token");

    if (!customerId || !token) {

      alert("Please login first");

      return;

    }

   const productPrice =
  Number(product.discounted_price || product.price);

const totalPrice =
  productPrice * quantity;

    await axios.post(
      "http://127.0.0.1:8000/api/orders/",
      {
        customer: Number(customerId),

        product: product.id,

        quantity: quantity,

        total_price: totalPrice,

        ...orderData,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    alert("Order Placed Successfully");

  } catch (err) {

    console.log(err.response?.data);

    alert("Failed to place order");

  }

};
  if (!product) {

    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );

  }

const total =
  quantity *
  Number(product.discounted_price || product.price);

  return (

    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-5">
            Delivery Details
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="district"
              placeholder="District"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <select
              name="payment_method"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
            </select>

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-5">
            Order Summary
          </h2>

          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : `http://127.0.0.1:8000${product.image}`
            }
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />

          <h3 className="text-2xl font-bold mt-4">
            {product.name}
          </h3>

         {product.offer_percentage > 0 &&
 Number(product.discounted_price) < Number(product.price) ? (
  <div className="mt-2">
    <p className="text-green-600 font-bold text-xl">
      ₹{product.discounted_price} / {product.unit}
    </p>

    <p className="text-gray-400 line-through">
      ₹{product.price}
    </p>

    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
      {product.offer_percentage}% OFF
    </span>
  </div>
) : (
  <p className="text-gray-600 mt-2">
    ₹{product.price} / {product.unit}
  </p>
)}

          <div className="flex items-center gap-4 mt-5">

            <button
              onClick={() =>
                setQuantity(quantity > 1 ? quantity - 1 : 1)
              }
              className="bg-gray-200 px-4 py-2 rounded"
            >
              -
            </button>

            <span className="text-xl font-bold">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              +
            </button>

          </div>

          <div className="mt-6 border-t pt-4">

            <div className="flex justify-between mb-2">
              <span>Product Total</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Delivery Charge</span>
              <span>₹40</span>
            </div>

            <div className="flex justify-between text-2xl font-bold mt-4">
              <span>Grand Total</span>
              <span>₹{total + 40}</span>
            </div>

          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-bold"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductOrder;