import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


function CustomerLayout() {
  return (
    <div>
      <Navbar/>
     
      <Outlet />

    </div>
  );
}

export default CustomerLayout;
