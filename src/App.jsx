import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products"; 
import ProductDetail from "./pages/ProductDetail"
import Home from "./pages/Home"
import Header from "./components/Header";
import Footer from "./components/Footer"
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders"; 


export default function App() {
  return (
    <BrowserRouter>
      <Header/>
         <Navbar />
         <div className="pt-32">
      <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
         <Route path="/products/:id" element={<ProductDetail />} />
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/checkout" element={<Checkout/>}></Route>
         <Route path="/orders" element={<Orders />} />

      </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}
