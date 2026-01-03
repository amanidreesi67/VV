import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import Footer from "./Common/Footer";
import Headers from "./Common/Header"; // Make sure this file exists
import Home from "./Home";
import Product from "./Product/Product";
import ProductDetails from "./Product/ProductDetails";
import Wishlist from "./Wishlist/Wishlist";
import { CartProvider } from "./Context/CartContext";
import CartDrawer from "./Cart/CartDrawer";
import FloatingButtons from "../Global/FloatingButtons";
import ContactUs from "./ContactUs/ContactUs";

function App() {
  return (
    <CartProvider>
      <FloatingButtons />
      <Headers />
      <CartDrawer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pdt/:levelOne" element={<Product />} />
        <Route path="/pdt/:levelOne/:levelTwo" element={<Product />} />
        <Route
          path="/pdt/:levelOne/:levelTwo/:LevelThree"
          element={<Product />}
        />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
