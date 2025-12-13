import React from "react";
import { Router,Routes, Route } from "react-router-dom";
import Footer from "./Common/Footer";
import Headers from "./Common/Header"; // Make sure this file exists

function App() {
  return (
    <>
      <Headers />

      <Routes>
        {/* Add your page routes here */}
        {/* Example */}
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;