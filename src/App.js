import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import  Navbar from './component/Header';
//pages
import { Home } from "./pages/Home";
import { Signin } from "./pages/Auth/Signin";
import  Signup  from "./pages/Auth/Signup";
import Cart from "./pages/Cart";
import History from "./pages/History";
import Reset from "./pages/Auth/Reset";

import { ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";
// import AdminRoute from "./component/AdminRoute";
import AdminHome from "./pages/admin/AdminHome";
import OwnerHome from "./pages/owner/OwnerHome";
import AdminOrders from "./pages/admin/AdminOrders";
import AddServices from "./pages/admin/AddServices";
import ViewServices from "./pages/admin/ViewServices";
import Services from "./pages/services/Services";



const App = () => {

  injectStyle();

  return (
    <>

    <Router>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<History />} />
        {/* <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>}> */}
        {/* <Route path='home' element={<Home />} />
          <Route path="all-services" element={<ViewServices />} />
          <Route path="add-service/:id" element={<AddServices />} />
          <Route path="orders" element={<Orders />} />
        </Route> */}
        <Route path="/reset" element={<Reset />} />
        <Route path="/services" element={<Services />} />

        
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/addservices/:id" element={<AddServices />} />
        {/* <Route path="/allservices" element={<AdminAllServices />} /> */}
        <Route path="/allservices" element={<ViewServices />} />
        <Route path="/adminorders" element={<AdminOrders />} />

        <Route path="/ownerhome" element={<OwnerHome />} />


      </Routes>
    </Router>
    </>
  );
}

export default App;
