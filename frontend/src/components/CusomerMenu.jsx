import React from 'react'

function CusomerMenu() {
  return (
    <div>
      {/* MENU SECTION UNDER NAVBAR */}

<div className="bg-green-800 text-white shadow-md">

  <div className="max-w-7xl mx-auto px-6">

    <div className="flex items-center justify-between overflow-x-auto whitespace-nowrap py-4 gap-10">

      {/* HOME */}

      <button className="hover:text-yellow-300 font-medium transition duration-300">
        Home
      </button>

      {/* PRODUCTS */}

      <button className="hover:text-yellow-300 font-medium transition duration-300">
        Products
      </button>

      {/* CATEGORIES */}

      <button className="hover:text-yellow-300 font-medium transition duration-300">
        Categories
      </button>

      {/* FARMERS */}

      <button className="hover:text-yellow-300 font-medium transition duration-300">
        Farmers
      </button>

      {/* MY ORDERS */}

      <button className="hover:text-yellow-300 font-medium transition duration-300">
        My Orders
      </button>

      {/* FAVORITES */}

      <button className="hover:text-yellow-300 font-medium transition duration-300">
        Favorites
      </button>

      {/* MESSAGES */}

      <button className="hover:text-yellow-300 font-medium transition duration-300">
        Messages
      </button>

      {/* PROFILE */}

      <button className="hover:text-yellow-300 font-medium transition duration-300">
        Profile
      </button>

      {/* SETTINGS */}

      <button className="hover:text-yellow-300 font-medium transition duration-300">
        Settings
      </button>

      {/* LOGOUT */}

      <button className="hover:text-red-300 font-medium transition duration-300">
        Logout
      </button>

    </div>

  </div>

</div>
    </div>
  )
}

export default CusomerMenu
