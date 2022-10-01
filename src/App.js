import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import  Navbar from './component/Header';
//pages
import { Home } from "./pages/Home";
import { Signin } from "./pages/Auth/Signin";
import  Signup  from "./pages/Auth/Signup";
import Cart from "./pages/Cart";
import History from "./pages/History";
import Admin from "./pages/Admin";
import Reset from "./pages/Auth/Reset";

import { ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";
import Services from "./pages/Services";
import AdminRoute from "./component/AdminRoute";
import ViewServices from "./component/admin/ViewServices";
import AddServices from "./component/admin/AddServices";
import Orders from "./component/admin/Orders";
import AdminHome from "./pages/admin/AdminHome";


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
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>}>
        <Route path='home' element={<Home />} />
          <Route path="all-services" element={<ViewServices />} />
          <Route path="add-service/:id" element={<AddServices />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
        <Route path="/services" element={<Services />} />

        
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/addservices" element={<AddServices />} />
        <Route path="/viewservices" element={<ViewServices />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
