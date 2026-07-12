import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const FarmerRegister = () => {

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    location: "",
    password: "",
    confirm_password: ""
  });

  console.log(formData);

  // =========================
  // FORM SUBMIT FUNCTION
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/farmer-register/",
      formData
    );

    console.log(response.data);
    alert("Farmer Registration Successful");

  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
    alert("Something went wrong");
  }
};
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FEF9E7',
        margin: 0,
        padding: 0
      }}
    >

      <style
        dangerouslySetInnerHTML={{
          __html: `
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              background-color: #FEF9E7;
            }

            * {
              box-sizing: border-box;
              font-family: 'Segoe UI', Roboto, sans-serif;
            }
          `
        }}
      />

      {/* --- MAIN CONTENT SECTION --- */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '40px 8%',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >

        {/* LEFT SIDE: THE FORM CARD */}
        <div
          style={{
            flex: '1 1 500px',
            maxWidth: '580px'
          }}
        >

          <h1
            style={{
              fontSize: '38px',
              color: '#1B5E20',
              fontWeight: '800',
              margin: '0 0 5px 0'
            }}
          >
            Farmer Registration
          </h1>

          <p
            style={{
              color: '#666',
              fontSize: '14px',
              marginBottom: '25px'
            }}
          >
            Join{" "}

            <span
              style={{
                color: '#2E7D32',
                fontWeight: 'bold'
              }}
            >
              AgroMart
            </span>

            {" "}and sell your fresh produce directly to customers.
          </p>

          {/* THE WHITE BOX CONTAINER */}
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0px 10px 40px rgba(0,0,0,0.06)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '15px',
              rowGap: '15px'
            }}
          >

            {/* Full Name */}
            <div style={fieldBox}>

              <label style={labelStyle}>
                Full Name
              </label>

              <div style={inputWrap}>

                <span style={iconStyle}>
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  style={inputStyle}
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      full_name: e.target.value
                    })
                  }
                />

              </div>
            </div>

            {/* Phone Number */}
            <div style={fieldBox}>

              <label style={labelStyle}>
                Phone Number
              </label>

              <div style={inputWrap}>

                <span style={iconStyle}>
                  📞
                </span>

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  style={inputStyle}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value
                    })
                  }
                />

              </div>
            </div>

            {/* Email */}
            <div
              style={{
                ...fieldBox,
                gridColumn: 'span 2'
              }}
            >

              <label style={labelStyle}>
                Email
              </label>

              <div style={inputWrap}>

                <span style={iconStyle}>
                  ✉️
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  style={inputStyle}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                />

              </div>
            </div>

            {/* Location */}
            <div
              style={{
                ...fieldBox,
                gridColumn: 'span 2'
              }}
            >

              <label style={labelStyle}>
                Location
              </label>

              <div style={inputWrap}>

                <span style={iconStyle}>
                  📍
                </span>

                <input
                  type="text"
                  placeholder="Enter your location"
                  style={inputStyle}
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value
                    })
                  }
                />

              </div>
            </div>

            {/* Password */}
            <div style={fieldBox}>

              <label style={labelStyle}>
                Password
              </label>

              <div style={inputWrap}>

                <span style={iconStyle}>
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Create password"
                  style={inputStyle}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value
                    })
                  }
                />

              </div>
            </div>

            {/* Confirm Password */}
            <div style={fieldBox}>

              <label style={labelStyle}>
                Confirm Password
              </label>

              <div style={inputWrap}>

                <span style={iconStyle}>
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Confirm password"
                  style={inputStyle}
                  value={formData.confirm_password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirm_password: e.target.value
                    })
                  }
                />

              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              style={{
                gridColumn: 'span 2',
                backgroundColor: '#2E7D32',
                color: 'white',
                padding: '14px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                marginTop: '5px'
              }}
            >
              Create Account →
            </button>

            <p
              style={{
                gridColumn: 'span 2',
                textAlign: 'center',
                fontSize: '13px',
                color: '#777',
                margin: 0
              }}
            >
              Already have an account?

              <Link
            to="/farmerLogin"
            style={{
            color: '#2E7D32',
            fontWeight: 'bold',
            cursor: 'pointer'
    }}
  >
    Login
  </Link>
            </p>

          </form>
        </div>

        {/* RIGHT SIDE: THE IMAGE */}
        <div
          style={{
            flex: '1 1 350px',
            textAlign: 'center',
            position: 'relative'
          }}
        >

          <img
            src="/farmer.png"
            alt="Farmer"
            style={{
              width: '100%',
              maxWidth: '800px'
            }}
          />

          {/* Floating Badge */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '0',
              backgroundColor: '#1B5E20',
              color: 'white',
              padding: '12px',
              borderRadius: '12px',
              width: '110px',
              fontSize: '10px',
              fontWeight: 'bold',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
            }}
          >
            🌱 Grow Together, Sell Better, Live Better.
          </div>

        </div>

      </div>
    </div>
  );
};

// --- CSS LOGIC TO KEEP SYMBOLS INSIDE ---

const fieldBox = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const labelStyle = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#444'
};

const inputWrap = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
};

const iconStyle = {
  position: 'absolute',
  left: '12px',
  fontSize: '14px',
  color: '#888',
  pointerEvents: 'none'
};

const inputStyle = {
  width: '100%',
  padding: '10px 10px 10px 35px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  fontSize: '13px',
  outlineColor: '#2E7D32',
  backgroundColor: '#FAFAFA',
  color: '#000'
};

export default FarmerRegister;