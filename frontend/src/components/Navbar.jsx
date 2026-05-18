import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 5%', 
      width: '100%',
      backgroundColor: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <h1 style={{ color: '#2E7D32', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          AgroMart
        </h1>

        <div style={{ 
          backgroundColor: '#f3f3f3', 
          padding: '10px 20px', 
          borderRadius: '50px', 
          width: '35vw', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '13px', color: '#666' }}>
            All Categories ⌄
          </span>

          <span style={{ color: '#999' }}>🔍</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '25px', fontWeight: 'bold', fontSize: '13px' }}>
        <span>HOME</span>

        <Link 
          to="/FarmerRegister" 
          style={{ textDecoration: "none", color: "black" }}
        >
          FARMER
        </Link>

     <Link
  to="/customer/customerregister"
  style={{ textDecoration: "none", color: "black" }}
>
  CUSTOMER
</Link>

        <div style={{ display: 'flex', gap: '15px', marginLeft: '10px' }}>
          👤 ❤️ 🛒
        </div>
      </div>
    </nav>
  );
};

export default Navbar;