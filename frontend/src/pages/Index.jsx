import React from 'react';

const AgroMartIndex = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: 'white' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        body, html { margin: 0 !important; padding: 0 !important; overflow-x: hidden; }
        * { box-sizing: border-box; }
      `}} />

      {/* Hero Section */}
      <section style={{ 
        backgroundColor: '#FFD95A', 
        width: '100%', 
        display: 'flex', 
        flexWrap: 'wrap',
        alignItems: 'center',
        minHeight: '500px'
      }}>
        <div style={{ flex: '1 1 500px', padding: '40px 5%' }}>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 65px)', fontWeight: '900', lineHeight: '1.1', margin: 0 }}>
            <span style={{ color: '#2E7D32' }}>AgroMart</span> Foods at<br />
            your <span style={{ textDecoration: 'underline', textDecorationColor: '#4CAF50' }}>Doorsteps</span>
          </h1>

          <p style={{ margin: '20px 0 30px 0', fontSize: '18px', color: '#444' }}>
            Dignissim massa diam elementum.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
            <button style={{ 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              padding: '15px 30px', 
              borderRadius: '50px', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}>
              START SHOPPING
            </button>

            <button style={{ 
              backgroundColor: 'black', 
              color: 'white', 
              border: 'none', 
              padding: '15px 30px', 
              borderRadius: '50px', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}>
              JOIN NOW
            </button>
          </div>

          <div style={{ display: 'flex', gap: '30px' }}>
            <div>
              <b style={{ fontSize: '22px' }}>14k+</b>
              <p style={{ fontSize: '10px', margin: 0, color: '#666', fontWeight: 'bold' }}>
                PRODUCT VARIETIES
              </p>
            </div>

            <div>
              <b style={{ fontSize: '22px' }}>50k+</b>
              <p style={{ fontSize: '10px', margin: 0, color: '#666', fontWeight: 'bold' }}>
                HAPPY CUSTOMERS
              </p>
            </div>

            <div>
              <b style={{ fontSize: '22px' }}>10+</b>
              <p style={{ fontSize: '10px', margin: 0, color: '#666', fontWeight: 'bold' }}>
                STORE LOCATIONS
              </p>
            </div>
          </div>
        </div>

        <div style={{ 
          flex: '1 1 500px', 
          height: '500px', 
          display: 'flex', 
          justifyContent: 'flex-end' 
        }}>
          <img 
            src="/AgroMart.png" 
            alt="AgroMart" 
            style={{ height: '100%', width: '100%', objectFit: 'cover' }} 
          />
        </div>
      </section>

      {/* Feature Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', color: 'white' }}>
        {[
          { label: 'Fresh from farm', icon: '🔄', color: '#56A04D' },
          { label: '100% Organic', icon: '🌿', color: '#2D2D2D' },
          { label: 'Free delivery', icon: '🚚', color: '#F35C05' }
        ].map((item, idx) => (
          <div 
            key={idx} 
            style={{ 
              flex: '1 1 300px', 
              backgroundColor: item.color, 
              padding: '40px 20px', 
              textAlign: 'center' 
            }}
          >
            <div style={{ fontSize: '32px' }}>{item.icon}</div>

            <h3 style={{ margin: '10px 0' }}>{item.label}</h3>

            <p style={{ 
              fontSize: '12px', 
              opacity: 0.8, 
              maxWidth: '250px', 
              margin: '0 auto' 
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </div>

      {/* Category Section */}
      <section style={{ padding: '60px 5%' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '40px' 
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            Category
          </h2>

          <button style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '5px' 
          }}>
            View All
          </button>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '20px' 
        }}>
          {['Fruits & Veges', 'Breads & Sweets', 'Beverages', 'Meat Products', 'Breads', 'Fruits & Veges'].map((cat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '1/1', 
                borderRadius: '50%', 
                backgroundColor: '#f5f5f5', 
                border: '1px solid #eee', 
                marginBottom: '10px',
                backgroundImage: 'url(https://via.placeholder.com/150)',
                backgroundSize: 'cover'
              }}></div>

              <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {cat}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AgroMartIndex;