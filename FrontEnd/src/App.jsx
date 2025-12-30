import React from "react";
import { Router,Routes, Route } from "react-router-dom";
import Footer from "./Common/Footer";
import Headers from "./Common/Header"; // Make sure this file exists
import Home from "./Home";
import Product from "./Product/Product";

function App() {
  return (
    <>
      <Headers />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pdt/:levelOne" element={<Product />} />
        <Route path="/pdt/:levelOne/:levelTwo" element={<Product />} />
        <Route path="/pdt/:levelOne/:levelTwo/:LevelThree" element={<Product />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;