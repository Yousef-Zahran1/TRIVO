// src/App.jsx
import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Home from "./pages/home/home";
import Shop from "./pages/shop/Shop";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import Footer from "./components/Footer";
import Header from './components/Header';

// تسجيل الملحقات
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

function App() {
  const mainRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    // تشغيل الـ ScrollSmoother
    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: mainRef.current,
      smooth: 1.5,
      effects: true,
    });
  }, []);

  return (
    <Router>
      <div className="bg-black" ref={wrapperRef} id="smooth-wrapper">
        <Header />

        <div ref={mainRef} id="smooth-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;