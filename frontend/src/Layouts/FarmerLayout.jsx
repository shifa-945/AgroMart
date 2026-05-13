import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'
import FarmerSidebar from '../components/FarmerSidebar'

function FarmerLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <Navbar />

      {/* SIDEBAR + MAIN CONTENT */}
      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-72">
          <FarmerSidebar />
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default FarmerLayout