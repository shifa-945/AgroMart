import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function FarmerLogin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/farmerlogin/",
        {
          email: email,
          password: password
        }
      )

      console.log(response.data)

      if (response.data.message === "Login successful") {

       localStorage.setItem("farmerId", response.data.id)

        alert("Login successful")
        console.log(response.data)
        navigate("/farmer/dashboard")
      }

    }

    catch (error) {

      alert("Invalid email or password")

      console.log(error)

    }

  }

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE IMAGE */}

      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop')"
        }}
      >

        <div className="absolute inset-0 bg-green-900/60"></div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">

          <h1 className="text-6xl font-bold leading-tight mb-6">
            Welcome To AgroMart
          </h1>

          <p className="text-xl leading-8 text-green-100">
            Connect farmers directly with customers and grow your agricultural business digitally.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE LOGIN FORM */}

      <div className="w-full lg:w-1/2 bg-green-50 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">

          <div className="text-center mb-8">

            <h2 className="text-4xl font-bold text-green-700 mb-3">
              Farmer Login
            </h2>

            <p className="text-gray-500">
              Access your farmer marketplace account
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>

              <label className="block mb-2 text-gray-700 font-semibold">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-green-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            <div>

              <label className="block mb-2 text-gray-700 font-semibold">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-green-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="text-green-700 cursor-pointer hover:underline">
                Forgot Password?
              </span>

            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-lg"
            >
              Login
            </button>

          </form>

          <p className="text-center text-gray-600 mt-8">

            Don’t have an account?{" "}

            <Link
              to="/farmerregister"
              className="text-green-700 font-semibold hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default FarmerLogin