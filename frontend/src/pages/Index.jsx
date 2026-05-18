import React from "react";
import { useNavigate } from "react-router-dom";

const AgroMartIndex = () => {

  const navigate = useNavigate();

  const customerId = localStorage.getItem("customerId");

  // ================= NAVIGATION =================

  const handleStart = () => {

    if (customerId) {

      navigate("/customer/home");

    } else {

      navigate("/customer/login");

    }
  };

  // ================= CATEGORIES =================

  // NO IMAGE FILES NEEDED

  const categories = [

    {
      name: "Vegetables",
      icon: "🥦"
    },

    {
      name: "Fruits",
      icon: "🍎"
    },

    {
      name: "Leafy",
      icon: "🥬"
    },

    {
      name: "Organic",
      icon: "🌿"
    },

    {
      name: "Fresh Farm",
      icon: "🚜"
    },

    {
      name: "Healthy",
      icon: "💚"
    }

  ];

  return (

    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "white"
      }}
    >

      <style
        dangerouslySetInnerHTML={{
          __html: `
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              overflow-x: hidden;
            }

            * {
              box-sizing: border-box;
            }
          `,
        }}
      />

      {/* HERO SECTION */}

      <section
        style={{
          backgroundColor: "#FFD95A",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          minHeight: "500px",
        }}
      >

        {/* LEFT CONTENT */}

        <div
          style={{
            flex: "1 1 500px",
            padding: "40px 5%",
          }}
        >

          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 65px)",
              fontWeight: "900",
              lineHeight: "1.1",
              margin: 0,
            }}
          >

            <span style={{ color: "#2E7D32" }}>
              AgroMart
            </span>{" "}

            Foods at
            <br />

            your{" "}

            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#4CAF50",
              }}
            >
              Doorsteps
            </span>

          </h1>

          <p
            style={{
              margin: "20px 0 30px 0",
              fontSize: "18px",
              color: "#444",
            }}
          >
            Fresh vegetables, fruits and farm products directly from farmers.
          </p>

          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >

            {/* START SHOPPING */}

            <button
              onClick={handleStart}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "50px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              START SHOPPING
            </button>

            {/* JOIN NOW */}

            <button
              onClick={() =>
                navigate("/customer/customerregister")
              }
              style={{
                backgroundColor: "black",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "50px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              JOIN NOW
            </button>

          </div>

          {/* STATS */}

          <div
            style={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >

            <div>

              <b style={{ fontSize: "22px" }}>
                14k+
              </b>

              <p
                style={{
                  fontSize: "10px",
                  margin: 0,
                  color: "#666",
                  fontWeight: "bold",
                }}
              >
                PRODUCT VARIETIES
              </p>

            </div>

            <div>

              <b style={{ fontSize: "22px" }}>
                50k+
              </b>

              <p
                style={{
                  fontSize: "10px",
                  margin: 0,
                  color: "#666",
                  fontWeight: "bold",
                }}
              >
                HAPPY CUSTOMERS
              </p>

            </div>

            <div>

              <b style={{ fontSize: "22px" }}>
                10+
              </b>

              <p
                style={{
                  fontSize: "10px",
                  margin: 0,
                  color: "#666",
                  fontWeight: "bold",
                }}
              >
                STORE LOCATIONS
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div
          style={{
            flex: "1 1 500px",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >

          <img
            src="/AgroMart.png"
            alt="AgroMart"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />

        </div>

      </section>

      {/* FEATURE BAR */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          color: "white",
        }}
      >

        {[
          {
            label: "Fresh from farm",
            icon: "🔄",
            color: "#56A04D",
          },

          {
            label: "100% Organic",
            icon: "🌿",
            color: "#2D2D2D",
          },

          {
            label: "Free delivery",
            icon: "🚚",
            color: "#F35C05",
          },

        ].map((item, idx) => (

          <div
            key={idx}
            style={{
              flex: "1 1 300px",
              backgroundColor: item.color,
              padding: "40px 20px",
              textAlign: "center",
            }}
          >

            <div style={{ fontSize: "32px" }}>
              {item.icon}
            </div>

            <h3 style={{ margin: "10px 0" }}>
              {item.label}
            </h3>

            <p
              style={{
                fontSize: "12px",
                opacity: 0.8,
                maxWidth: "250px",
                margin: "0 auto",
              }}
            >
              Fresh products directly from trusted farmers.
            </p>

          </div>

        ))}

      </div>

      {/* CATEGORY SECTION */}

      <section style={{ padding: "60px 5%" }}>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >

          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Category
          </h2>

          {/* VIEW ALL */}

          <button
            onClick={handleStart}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            View All
          </button>

        </div>

        {/* CATEGORY GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "25px",
          }}
        >

          {categories.map((cat, i) => (

            <div
              key={i}
              onClick={handleStart}
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >

              {/* ROUND ICON */}

              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #e5e5e5",
                  margin: "0 auto 12px auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "50px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                }}
              >

                {cat.icon}

              </div>

              {/* CATEGORY NAME */}

              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {cat.name}
              </p>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
};

export default AgroMartIndex;