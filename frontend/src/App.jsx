import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AgroMartIndex from "./pages/Index";
import FarmerRegister from "./pages/FarmerRegistration";
import MainLayout from "./Layouts/MainLayout";
import FarmerLogin from './pages/FarmerLogin';
import FarmerLayout from "./Layouts/FarmerLayout";
import FarmerDashboard from './pages/FarmerDashboard';
import FarmerProfile from './pages/FarmerProfile';
import AddProducts from './pages/AddProducts';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <AgroMartIndex />
      },

      {
        path: "/FarmerRegister",
        element: <FarmerRegister />
      },

       {
        path: "/farmerLogin",
        element: <FarmerLogin />
      },

      
    ]
  },

  {
    path: "/farmer",
    element: <FarmerLayout />,
  
  children: [
      {
        path: "dashboard",
        element: <FarmerDashboard />
      },

      {
        path: "profile",
        element: <FarmerProfile />
      },

      {
        path: "addproduct",
        element: <AddProducts />
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;