import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AgroMartIndex from "./pages/Index";
import FarmerRegister from "./pages/FarmerRegistration";
import MainLayout from "./Layouts/MainLayout";
import FarmerLogin from "./pages/FarmerLogin";

import FarmerLayout from "./Layouts/FarmerLayout";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerProfile from "./pages/FarmerProfile";
import AddProducts from "./pages/AddProducts";
import CustomerLogin from "./pages/CustomerLogin";
import FarmerProducts, {
  productLoader,
} from "./pages/FarmerProducts";

import FarmerViewProducts from "./pages/FarmerViewProducts";

import CustomerLayout from "./Layouts/CustomerLayout";
import CustomerRegistration from "./pages/CustomerRegistration";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerHome from "./pages/CustomerHome";
import ProductDetails from "./pages/ProductDetails";
import ProductOrder from "./pages/ProductOrder";
import CustomerCart from "./pages/CustomerCart";
import FarmerOrders from "./Pages/FarmerOrders";
import FarmerEarnings from './pages/FarmerEarnings';
const router = createBrowserRouter([

  // MAIN LAYOUT

  {
    path: "/",
    element: <MainLayout />,

    children: [

      {
        path: "/",
        element: <AgroMartIndex />,
      },

      {
        path: "/FarmerRegister",
        element: <FarmerRegister />,
      },

      {
        path: "/farmerLogin",
        element: <FarmerLogin />,
      },

    ],
  },

  // FARMER LAYOUT

  {
    path: "/farmer",
    element: <FarmerLayout />,

    children: [

      {
        path: "dashboard",
        element: <FarmerDashboard />,
      },

      {
        path: "profile",
        element: <FarmerProfile />,
      },

      {
        path: "addproduct",
        element: <AddProducts />,
      },

      {
        path: "farmerproducts",
        element: <FarmerProducts />,
        loader: productLoader,
      },

      {
        path: "farmerView/:id",
        element: <FarmerViewProducts />,
      },

      {
  path: "orders",
  element: <FarmerOrders />,
},

     {
  path: "earnings",
  element: <FarmerEarnings />,
}

    ],
  },

  // CUSTOMER LAYOUT

  {
    path: "/customer",
    element: <CustomerLayout />,

    children: [

      

      {
        path: "customerregister",
        element: <CustomerRegistration />,
      },

      {
        path:'Login',
        element:<CustomerLogin/>
      },

      {
  path: "dashboard",
  element: <CustomerDashboard />,
},

     {
  path: "home",
  element: <CustomerHome/>,
},

   {
  path: "product/:id",
  element: <ProductDetails/>,
 },

 {
  path: "/customer/order/:id",
  element: <ProductOrder />
},
{
  path: "/customer/cart",
  element: <CustomerCart />,
},

{
  path: "orders",
  element: <FarmerOrders />,
}

     

    ],
  },

]);

function App() {

  return <RouterProvider router={router} />;

}

export default App;