import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import  Navbar from './component/Navbar';
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
        <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        <Route path="/reset" element={<Reset />} />
        <Route path="/services" element={<Services />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
