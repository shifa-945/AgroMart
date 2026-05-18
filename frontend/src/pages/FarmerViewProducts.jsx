import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Pencil,
  Trash2,
  IndianRupee,
  Package,
  Boxes,
  Tag,
  FileText,
} from "lucide-react";

import { useParams } from "react-router-dom";

function FarmerViewProducts() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // FETCH SINGLE PRODUCT

  useEffect(() => {

   const farmerId = localStorage.getItem("farmerId");

axios
  .get(
    `http://127.0.0.1:8000/api/products/${id}/?farmer=${farmerId}`
  )
      .then((res) => {

        setProduct(res.data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, [id]);

  // LOADING

  if (!product) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-green-700">

        Loading Product...

      </div>

    );
  }

  return (

    <div className="bg-[#f5f7fb] min-h-screen p-6">

      {/* PAGE TITLE */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Product Details
        </h1>

        <p className="text-gray-500 mt-2">
          Dashboard &gt; My Products &gt; Product Details
        </p>

      </div>

      {/* MAIN CARD */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT SIDE IMAGE */}

          <div className="bg-gray-50 rounded-3xl overflow-hidden h-[500px] flex items-center justify-center">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

          </div>

          {/* RIGHT SIDE DETAILS */}

          <div>

            {/* PRODUCT NAME */}

            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              {product.name}
            </h2>

            {/* CATEGORY */}

            <div className="flex items-center gap-3 mb-8">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                {product.category}
              </span>

              <span className="text-gray-400 text-xl">
                /
              </span>

              <span className="text-gray-600 text-lg">
                {product.subcategory}
              </span>

            </div>

            {/* DETAILS */}

            <div className="space-y-6">

              {/* PRICE */}

              <div className="flex items-center justify-between border-b pb-4">

                <div className="flex items-center gap-3">

                  <IndianRupee className="text-green-600" />

                  <p className="text-xl text-gray-700">
                    Price
                  </p>

                </div>

                <p className="text-2xl font-bold text-green-700">
                  ₹{product.price} / {product.unit}
                </p>

              </div>

              {/* STOCK */}

              <div className="flex items-center justify-between border-b pb-4">

                <div className="flex items-center gap-3">

                  <Package className="text-green-600" />

                  <p className="text-xl text-gray-700">
                    Stock Quantity
                  </p>

                </div>

                <p className="text-2xl font-semibold text-green-700">
                  {product.stockQuantity} {product.unit}
                </p>

              </div>

              {/* MINIMUM ORDER */}

              <div className="flex items-center justify-between border-b pb-4">

                <div className="flex items-center gap-3">

                  <Boxes className="text-green-600" />

                  <p className="text-xl text-gray-700">
                    Minimum Order
                  </p>

                </div>

                <p className="text-2xl font-semibold text-green-700">
                  {product.minimumOrderQuantity} {product.unit}
                </p>

              </div>

              {/* CATEGORY */}

              <div className="flex items-center justify-between border-b pb-4">

                <div className="flex items-center gap-3">

                  <Tag className="text-green-600" />

                  <p className="text-xl text-gray-700">
                    Category
                  </p>

                </div>

                <p className="text-xl text-gray-700">
                  {product.category}
                </p>

              </div>

              {/* DESCRIPTION */}

              <div className="flex items-start justify-between gap-6">

                <div className="flex items-center gap-3">

                  <FileText className="text-green-600 mt-1" />

                  <p className="text-xl text-gray-700">
                    Description
                  </p>

                </div>

                <p className="text-lg text-gray-600 text-right max-w-md leading-8">
                  {product.description}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="border-t mt-10 pt-8 flex gap-5">

          {/* EDIT BUTTON */}

          <button className="flex-1 border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 py-5 rounded-2xl flex items-center justify-center gap-3 transition">

            <Pencil
              size={22}
              className="text-gray-700"
            />

            <span className="text-xl font-semibold text-gray-700">
              Edit Product
            </span>

          </button>

          {/* DELETE BUTTON */}

          <button className="flex-1 bg-green-600 hover:bg-green-700 py-5 rounded-2xl flex items-center justify-center gap-3 transition">

            <Trash2
              size={22}
              className="text-white"
            />

            <span className="text-xl font-semibold text-white">
              Delete Product
            </span>

          </button>

        </div>

      </div>

    </div>

  );
}

export default FarmerViewProducts;