import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
// import Fruits from "./Components/Fruits";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
// import './App.scss';
import "./main.scss";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          {/* <Route path="/category/fruits" element={<Fruits />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
