import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Menu,
  Heart,
  ShoppingCart,
} from "lucide-react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const [reviewText, setReviewText] = useState("");

  const [rating, setRating] = useState(0);

  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);

const customerId = localStorage.getItem("customer_id");
const token = localStorage.getItem("token");

  // ================= FETCH PRODUCT =================

  useEffect(() => {

    fetchProduct();

    fetchReviews();

  }, [id]);

 const fetchProduct = async () => {

  try {

    const res = await axios.get(
      `http://127.0.0.1:8000/api/products/${id}/`
    );

    console.log(res.data)

    console.log(res.data.farmer_details)

    setProduct(res.data);

  } catch (err) {

    console.log(err);

  }

};
  // ================= FETCH REVIEWS =================

  const fetchReviews = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/reviews/?product=${id}`
      );

      setReviews(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // ================= ADD REVIEW =================

  const handleAddReview = async () => {

    if (!reviewText.trim() || rating === 0)
      return;

    try {

      if (!customerId || !token) {
  alert("Please login first");
  navigate("/customer/login");
  return;
}

await axios.post(
  "http://127.0.0.1:8000/api/reviews/",
  {
    product: Number(id),
    customer: Number(customerId),
    rating: Number(rating),
    comment: reviewText,
  },
  {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
);

      setReviewText("");

      setRating(0);

      fetchReviews();

    } catch (err) {

      console.log(err.response?.data);

    }

  };

  // ================= LOADING =================

  if (!product) {

    return (

      <div className="p-6 text-center text-gray-500">

        Loading product details...

      </div>

    );

  }

  // ================= TOTAL PRICE =================

  const totalPrice =
    quantity * Number(product.price);

  return (

    <div className="bg-gray-50 min-h-screen">

      {/* ================= MENU BAR ================= */}

    

      {/* ================= PRODUCT SECTION ================= */}

      <div className="p-6">

        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* IMAGE */}

          <img
            src={product.image}
            className="w-full h-80 object-cover rounded-lg"
            alt={product.name}
          />

          {/* DETAILS */}

          <div>

            <h1 className="text-3xl font-bold text-green-700">

              {product.name}

            </h1>

            <p className="text-gray-600 mt-2">

              {product.description}

            </p>

            <p className="text-lg text-gray-500 mt-3">

              1 {product.unit} Price :

              <span className="font-bold text-black ml-2">

                ₹{product.price}

              </span>

            </p>

            {/* TOTAL PRICE */}

            <p className="text-3xl font-bold mt-4 text-green-700">

              Total : ₹{totalPrice}

            </p>

            {/* QUANTITY */}

            <div className="flex items-center gap-4 mt-5">

              <button
                onClick={() =>
                  setQuantity(
                    quantity > 1
                      ? quantity - 1
                      : 1
                  )
                }
                className="px-4 py-2 bg-gray-200 rounded-lg text-xl"
              >
                -
              </button>

              <span className="font-bold text-xl">

                {quantity}

              </span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                className="px-4 py-2 bg-gray-200 rounded-lg text-xl"
              >
                +
              </button>

            </div>

            {/* BUTTONS */}

            <div className="flex gap-4 mt-6">

              <button
                onClick={() =>
                  navigate(
                    `/customer/order/${product.id}`
                  )
                }
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Order Now
              </button>

              <button

                onClick={async () => {

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
    product_id: product.id,
    quantity: quantity,
  },
  {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
);

                    alert(
                      "Product added to cart"
                    );

                    navigate("/customer/cart");

                  } catch (err) {

                    console.log(err);

                    alert(
                      "Failed to add to cart"
                    );

                  }

                }}

                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
              >
                Add to Cart
              </button>

            </div>

          </div>

        </div>

        {/* ================= FARMER DETAILS ================= */}
{/* ================= FARMER DETAILS ================= */}

<div className="max-w-6xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6">

  <h2 className="text-xl font-bold text-green-700 mb-4">
    Farmer Details
  </h2>

  <div className="grid md:grid-cols-2 gap-4 text-gray-700">

    <p>
      <b>Name:</b>{" "}
      {product?.farmer_details?.full_name}
    </p>

    <p>
      <b>Farm:</b>{" "}
      {product?.farmer_details?.farm_name}
    </p>

    <p>
      <b>Phone:</b>{" "}
      {product?.farmer_details?.phone}
    </p>

    <p>
      <b>Village:</b>{" "}
      {product?.farmer_details?.village}
    </p>

    <p>
      <b>District:</b>{" "}
      {product?.farmer_details?.district}
    </p>

    <p>
      <b>State:</b>{" "}
      {product?.farmer_details?.state}
    </p>

  </div>

</div>
        {/* ================= REVIEW SECTION ================= */}

        <div className="max-w-6xl mx-auto mt-6 bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-4">

            Customer Reviews

          </h2>

          {/* ADD REVIEW */}

          <div className="space-y-3 mb-6">

            <div className="flex gap-1">

              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  key={star}
                  onClick={() =>
                    setRating(star)
                  }
                  className={`text-3xl ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>

              ))}

            </div>

            <textarea
              value={reviewText}
              onChange={(e) =>
                setReviewText(
                  e.target.value
                )
              }
              placeholder="Write your review..."
              className="w-full border p-3 rounded-lg"
            />

            <button
              onClick={handleAddReview}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              Post Review
            </button>

          </div>

          {/* REVIEW LIST */}

          <div className="space-y-4">

            {reviews.map((r) => (

              <div
                key={r.id}
                className="border p-4 rounded bg-gray-50"
              >

                <div className="flex justify-between">

                  <p className="font-semibold">

                    Customer

                  </p>

                  <div className="text-yellow-400">

                    {"★".repeat(r.rating)}

                    {"☆".repeat(
                      5 - r.rating
                    )}

                  </div>

                </div>

                <p className="text-gray-700 mt-2">

                  {r.comment}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;