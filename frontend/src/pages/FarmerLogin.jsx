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
        { email, password }
      )

      console.log(response.data)

      // ================= TOKEN =================
      localStorage.setItem("token", response.data.token)

      // ================= USER ID =================
      localStorage.setItem("user_id", response.data.user_id)

      // ================= FARMER ID (IMPORTANT) =================
      if (response.data.farmer_id) {
        localStorage.setItem("farmer_id", response.data.farmer_id)
      } else {
        // fallback: if no farmer_id returned
        localStorage.setItem("farmer_id", response.data.user_id)
      }

      alert("Login successful")
      navigate("/farmer/dashboard")

    } catch (error) {
      console.log(error.response?.data || error.message)
      alert("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-green-900/60"></div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-6xl font-bold mb-6">Welcome To AgroMart</h1>
          <p className="text-xl text-green-100">
            Connect farmers and customers directly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 bg-green-50 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">

          <h2 className="text-4xl font-bold text-green-700 text-center mb-6">
            Farmer Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-xl"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 rounded-xl"
            />

            <button
              className="w-full bg-green-700 text-white py-3 rounded-xl"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6">
            Don’t have account?{" "}
            <Link to="/farmerregister" className="text-green-700">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default FarmerLogin