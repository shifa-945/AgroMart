import React, { useState } from "react";
import axios from "axios";
import {
  Upload,
  PlusCircle,
} from "lucide-react";

function AddProducts() {

  const [products, setProducts] = useState({
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

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {

    const { name, value, files } = e.target;

    // IMAGE INPUT
    if (name === "image") {

      setProducts({
        ...products,
        image: files[0],
      });

    } else {

      setProducts({
        ...products,
        [name]: value,
      });

    }
  };

  // SEND DATA TO API
  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", products.name);
    formData.append("category", products.category);
    formData.append("subcategory", products.subcategory);
    formData.append("price", products.price);
    formData.append("unit", products.unit);
    formData.append("stockQuantity", products.stockQuantity);
    formData.append(
      "minimumOrderQuantity",
      products.minimumOrderQuantity
    );
    formData.append("description", products.description);
    formData.append("image", products.image);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert("Product Added Successfully");

      // CLEAR FORM
      setProducts({
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

    } catch (error) {

     console.log(error.response.data);

      alert("Failed To Add Product");
    }
  };

  return (

    <div className="bg-[#f5f7fb] min-h-screen p-6">

      {/* PAGE TITLE */}

      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Add New Product
        </h1>

        <p className="text-gray-500 mt-2">
          Dashboard &gt; Add Product
        </p>
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT SIDE */}

        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Product Information
          </h2>

          <form onSubmit={handleSubmit}>

            {/* PRODUCT NAME */}

            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={products.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
              />
            </div>

            {/* CATEGORY + SUBCATEGORY */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

              <div>
                <label className="block mb-2 font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={products.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                >
                  <option value="">Select category</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Sub Category
                </label>

                <input
                  type="text"
                  name="subcategory"
                  value={products.subcategory}
                  onChange={handleChange}
                  placeholder="Select sub category"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                />
              </div>

            </div>

            {/* PRICE + UNIT */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

              <div>
                <label className="block mb-2 font-medium">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={products.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Unit
                </label>

                <select
                  name="unit"
                  value={products.unit}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                >
                  <option value="">Select unit</option>
                  <option value="Kg">Kg</option>
                  <option value="Piece">Piece</option>
                  <option value="Litre">Litre</option>
                </select>
              </div>

            </div>

            {/* STOCK + MINIMUM */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

              <div>
                <label className="block mb-2 font-medium">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stockQuantity"
                  value={products.stockQuantity}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Minimum Order Quantity
                </label>

                <input
                  type="number"
                  name="minimumOrderQuantity"
                  value={products.minimumOrderQuantity}
                  onChange={handleChange}
                  placeholder="Enter minimum order quantity"
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                />
              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="mb-5">

              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={products.description}
                onChange={handleChange}
                placeholder="Write about your product..."
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
              ></textarea>

            </div>

            {/* IMAGE */}

            <div className="mb-8">

              <label className="block mb-3 font-medium">
                Product Image
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">

                <Upload
                  size={50}
                  className="mx-auto text-green-600 mb-4"
                />

                <p className="text-gray-500 mb-4">
                  Drag & Drop Images Here
                </p>

                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                  id="imageUpload"
                />

                <label
                  htmlFor="imageUpload"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg cursor-pointer inline-block"
                >
                  Choose File
                </label>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-4">

              <button
                type="button"
                className="bg-gray-200 px-6 py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <PlusCircle size={18} />
                Save Product
              </button>

            </div>

          </form>

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">

          {/* PREVIEW CARD */}

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <h2 className="text-xl font-semibold text-green-700 mb-5">
              Product Preview
            </h2>

            <div className="border rounded-xl overflow-hidden mb-4">

              {
                products.image ? (

                  <img
                    src={URL.createObjectURL(products.image)}
                    alt="preview"
                    className="w-full h-56 object-cover"
                  />

                ) : (

                  <div className="h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>

                )
              }

            </div>

            <h3 className="text-2xl font-bold">
              {products.name || "Product Name"}
            </h3>

            <p className="text-green-600 mt-2">
              {products.category || "Category"}
            </p>

            <p className="text-2xl font-bold text-green-700 mt-3">
              ₹{products.price || "0.00"}
              <span className="text-gray-500 text-lg">
                {" "}
                / {products.unit || "Unit"}
              </span>
            </p>

            <p className="mt-3 text-gray-600">
              Stock: {products.stockQuantity || 0}
            </p>

            <p className="mt-4 text-gray-500">
              This is a preview of your product.
            </p>

          </div>

          {/* TIPS CARD */}

          <div className="bg-green-50 rounded-2xl p-5">

            <h2 className="text-xl font-semibold text-green-700 mb-4">
              Tips
            </h2>

            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Add clear images of your product</li>
              <li>Write accurate description</li>
              <li>Set competitive price</li>
              <li>Keep stock quantity updated</li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddProducts;