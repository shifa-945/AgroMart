import React from "react"
import { useLoaderData, Link } from "react-router-dom"
import { ShoppingBag } from "lucide-react"

export async function productLoader() {

  const farmerId = localStorage.getItem("farmer_id")

  const token = localStorage.getItem("token")

  const res = await fetch(
    `http://127.0.0.1:8000/api/products/?farmer=${farmerId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error("Products not found")
  }

  return res.json()
}

function FarmerProducts() {

  const products = useLoaderData()

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-6">

      {/* PAGE TITLE */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          My Products
        </h1>

        <p className="text-gray-500 mt-2">
          Dashboard &gt; My Products
        </p>

      </div>

      {/* PRODUCTS GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          

          
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-[500px]"
          >

            {/* IMAGE SECTION */}

            <div className="w-full h-60 bg-white flex items-center justify-center overflow-hidden p-4">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />

            </div>

            {/* DETAILS */}

            <div className="p-4 flex flex-col flex-1">

              {/* CATEGORY */}

              <p className="text-sm text-orange-500 font-medium mb-1">
                {product.category}
              </p>

              {/* PRODUCT NAME */}

              <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                {product.name}
              </h2>

              {/* DESCRIPTION */}

              <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                {product.description}
              </p>

              {/* PRICE + STOCK */}

              <div className="flex items-center justify-between mt-4">

                <div>

                  <h3 className="text-2xl font-bold text-green-700">
                    ₹{product.price}
                  </h3>

                  <p className="text-sm text-gray-500">
                    per {product.unit}
                  </p>

                </div>

                <div className="bg-orange-50 px-3 py-1 rounded-lg">

                  <p className="text-sm text-orange-600 font-medium">
                    {product.remaining_stock} Left
                  </p>

                </div>
               
              </div>

              {/* BUTTON */}
              <Link to={`/farmer/farmerView/${product.id}`}>
              <button className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2">

                <ShoppingBag size={18} />

                View Product

              </button>
           </Link>
            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default FarmerProducts