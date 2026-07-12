import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {
  Mail,
  Lock,
  EyeOff,
} from "lucide-react"

function CustomerLogin() {

  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })

  }

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/customerlogin/",
        loginData
        
      )
      console.log(response.data)
alert("Login Successful")

// TOKEN
localStorage.setItem(
  "token",
  response.data.token
)

// USER ID
localStorage.setItem(
  "user_id",
  response.data.user_id
)

// CUSTOMER ID
localStorage.setItem(
  "customer_id",
  response.data.customer_id
)

navigate("/customer/dashboard")

    } catch (error) {

      console.log(error)

      alert("Invalid Email or Password")
    }

  }

  return (

    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE */}

      <div
        className="hidden lg:flex flex-col justify-center px-16 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop')",
        }}
      >

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/35"></div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-xl text-white">

          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            Welcome to <br /> AgroMart
          </h1>

          <p className="text-2xl leading-relaxed text-gray-100">
            Fresh products, trusted farmers,
            delivered to your doorstep.
            Shop fresh, live healthy.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="bg-[#f4faf5] flex items-center justify-center px-6 py-10">

        {/* LOGIN CARD */}

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-[35px] shadow-xl p-10"
        >

          {/* TITLE */}

          <div className="text-center mb-10">

            <h1 className="text-5xl font-extrabold text-green-700 mb-4">
              Customer Login
            </h1>

            <p className="text-gray-500 text-lg">
              Access your AgroMart customer account
            </p>

          </div>

          {/* EMAIL */}

          <div className="mb-7">

            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Email Address
            </label>

            <div className="flex items-center border-2 border-green-200 rounded-2xl px-4 py-4 bg-white">

              <Mail className="text-gray-500 mr-3" size={22} />

              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                autoComplete="username"
                placeholder="Enter your email"
                className="w-full outline-none text-lg"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="mb-6">

            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Password
            </label>

            <div className="flex items-center border-2 border-green-200 rounded-2xl px-4 py-4 bg-white">

              <Lock className="text-gray-500 mr-3" size={22} />

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full outline-none text-lg"
              />

              <EyeOff
                className="text-gray-500 cursor-pointer"
                size={22}
              />

            </div>

          </div>

          {/* REMEMBER */}

          <div className="flex items-center justify-between mb-8">

            <div className="flex items-center">

              <input type="checkbox" className="mr-2 w-4 h-4" />

              <p className="text-gray-600">
                Remember me
              </p>

            </div>

            <button
              type="button"
              className="text-green-700 font-semibold hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold text-2xl py-4 rounded-2xl transition duration-300 shadow-md"
          >

            Login

          </button>

          {/* DIVIDER */}

          <div className="flex items-center my-8">

            <div className="flex-1 h-[1px] bg-gray-300"></div>

            <span className="px-4 text-gray-500 text-lg">
              or
            </span>

            <div className="flex-1 h-[1px] bg-gray-300"></div>

          </div>

          {/* REGISTER */}

          <div className="text-center">

            <p className="text-gray-600 text-lg">

              Don’t have an account?

              <span className="text-green-700 font-bold ml-2 cursor-pointer hover:underline">

                Register

              </span>

            </p>

          </div>

        </form>

      </div>

    </div>
  )
}

export default CustomerLogin