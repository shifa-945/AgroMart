import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import CustomerMenu from "../components/CustomerMenu";

function CustomerLayout() {

  return (

    <div>

      <Navbar />

      <CustomerMenu />

      <Outlet />

    </div>

  );
}

export default CustomerLayout;