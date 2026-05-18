import React, { useState } from "react"
import axios from "axios"

import {
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
} from "lucide-react"

import { Link } from "react-router-dom"

function CustomerRegistration() {

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirm_password: "",
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/customers/",
        formData
      )

      alert("Customer Registered Successfully")

      console.log(response.data)

    } catch (error) {

      console.log(error)

      alert("Registration Failed")
    }
  }

  return (

    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f6f7f2]">

      {/* LEFT SIDE */}

      <div className="flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-xl">

          <h1 className="text-5xl font-extrabold text-green-800 mb-4">
            Customer Registration
          </h1>

          <p className="text-gray-600 mb-10 text-lg">
            Create your{" "}
            <span className="text-green-700 font-semibold">
              AgroMart
            </span>{" "}
            account and start shopping fresh produce.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className="bg-white rounded-3xl shadow-md p-8"
          >

            {/* NAME & PHONE */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

              <div>

                <label className="block font-semibold mb-2">
                  Full Name
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3">

                  <User size={18} className="text-purple-600 mr-3" />

                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full outline-none"
                  />

                </div>

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Phone Number
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3">

                  <Phone size={18} className="text-pink-600 mr-3" />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full outline-none"
                  />

                </div>

              </div>

            </div>

            {/* EMAIL */}

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Email
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">

                <Mail size={18} className="text-purple-300 mr-3" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full outline-none"
                />

              </div>

            </div>

            {/* ADDRESS */}

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Address
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">

                <MapPin size={18} className="text-purple-600 mr-3" />

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  className="w-full outline-none"
                />

              </div>

            </div>

            {/* PASSWORDS */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

              <div>

                <label className="block font-semibold mb-2">
                  Password
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3">

                  <Lock size={18} className="text-orange-500 mr-3" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="Create password"
                    className="w-full outline-none"
                  />

                </div>

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Confirm Password
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3">

                  <Lock size={18} className="text-orange-500 mr-3" />

                  <input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    className="w-full outline-none"
                  />

                </div>

              </div>

            </div>

            {/* TERMS */}

            <div className="flex items-center mb-6 text-sm">

              <input type="checkbox" className="mr-2" />

              <p>
                I agree to the{" "}
                <span className="text-green-700 font-semibold">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-green-700 font-semibold">
                  Privacy Policy
                </span>
              </p>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition duration-300"
            >
              Create Account →
            </button>

            {/* LOGIN AREA */}

            <div className="text-center mt-6">

              <p className="text-gray-500 text-lg">

                Already have an account?

                <span className="text-green-700 font-bold cursor-pointer hover:underline ml-1">

                  <Link to="/customer/Login">
                    Login
                  </Link>

                </span>

              </p>

            </div>

          </form>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="hidden lg:flex items-center justify-center bg-white relative overflow-hidden">

        <div className="absolute top-10 right-10 bg-green-700 text-white text-sm font-semibold px-5 py-4 rounded-2xl shadow-lg">
          🌱 Grow <br />
          Together, Sell <br />
          Better, Live Better.
        </div>

        <div className="relative flex items-center justify-center">

          <div className="w-[600px] h-[600px] bg-green-50 rounded-full absolute"></div>

          <div className="relative z-10 flex flex-col items-center">

            <div className="w-72 h-80 bg-gradient-to-b from-green-300 to-green-600 rounded-[40%] flex items-center justify-center">

              <div className="w-28 h-28 bg-green-700 rounded-full"></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default CustomerRegistration