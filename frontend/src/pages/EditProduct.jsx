import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    unit: "",
    stockQuantity: "",
    minimumOrderQuantity: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  // ================= FETCH PRODUCT =================

 useEffect(() => {

  const token = localStorage.getItem("token");

  axios.get(
    `http://127.0.0.1:8000/api/products/${id}/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  )

  .then((res) => {

    setProduct(res.data);

    setPreviewImage(res.data.image);

  })

  .catch((err) => {

    console.log(err);

  });

}, [id]);
  // ================= HANDLE INPUT CHANGE =================

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

  };

  // ================= HANDLE IMAGE CHANGE =================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setProduct({
      ...product,
      image: file,
    });

    setPreviewImage(URL.createObjectURL(file));

  };

  // ================= UPDATE PRODUCT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("subcategory", product.subcategory);
    formData.append("price", product.price);
    formData.append("unit", product.unit);
    formData.append("stockQuantity", product.stockQuantity);
    formData.append(
      "minimumOrderQuantity",
      product.minimumOrderQuantity
    );
    formData.append("description", product.description);

    // IMAGE OPTIONAL

    if (product.image instanceof File) {

      formData.append("image", product.image);

    }

   try {

  const token = localStorage.getItem("token");

  await axios.patch(
    `http://127.0.0.1:8000/api/products/${id}/`,
    formData,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  alert("Product Updated Successfully");

navigate(`/farmer/farmerView/${id}`);

} catch (err) {

  console.log(err.response.data);

  alert("Update Failed");

}
};
  return (

    <div className="min-h-screen bg-[#f5f7fb] p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">

        {/* TITLE */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Edit Product
          </h1>

          <p className="text-gray-500 mt-2">
            Update your product information
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* IMAGE PREVIEW */}

          <div className="flex justify-center">

            <img
              src={previewImage}
              alt="Product"
              className="w-72 h-72 object-cover rounded-3xl border"
            />

          </div>

          {/* IMAGE INPUT */}

          <div>

            <label className="block mb-2 text-lg font-medium text-gray-700">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {/* PRODUCT NAME */}

          <div>

            <label className="block mb-2 text-lg font-medium text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {/* CATEGORY */}

          <div>

            <label className="block mb-2 text-lg font-medium text-gray-700">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {/* SUBCATEGORY */}

          <div>

            <label className="block mb-2 text-lg font-medium text-gray-700">
              Subcategory
            </label>

            <input
              type="text"
              name="subcategory"
              value={product.subcategory}
              onChange={handleChange}
              placeholder="Enter subcategory"
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {/* PRICE */}

          <div>

            <label className="block mb-2 text-lg font-medium text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {/* UNIT */}

          <div>

            <label className="block mb-2 text-lg font-medium text-gray-700">
              Unit
            </label>

            <input
              type="text"
              name="unit"
              value={product.unit}
              onChange={handleChange}
              placeholder="Enter unit"
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {/* STOCK QUANTITY */}

          <div>

            <label className="block mb-2 text-lg font-medium text-gray-700">
              Stock Quantity
            </label>

            <input
              type="number"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {/* MINIMUM ORDER */}

          <div>

            <label className="block mb-2 text-lg font-medium text-gray-700">
              Minimum Order Quantity
            </label>

            <input
              type="number"
              name="minimumOrderQuantity"
              value={product.minimumOrderQuantity}
              onChange={handleChange}
              placeholder="Enter minimum order quantity"
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="block mb-2 text-lg font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="5"
              className="w-full border border-gray-300 rounded-xl p-4"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-semibold transition"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>

  );
}

export default EditProduct;