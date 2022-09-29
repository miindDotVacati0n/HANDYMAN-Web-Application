import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import  Navbar from './component/Navbar';
import { AdSers } from "./pages/AdServs";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Signin } from "./pages/Auth/Signin";
import  Signup  from "./pages/Auth/Signup";
import Cart from "./pages/Cart";
import History from "./pages/History";
import Admin from "./pages/Admin";
import Reset from "./pages/Auth/Reset";

const App = () => {
  return (
    
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/adservs" element={<AdSers />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
}

export default App;
