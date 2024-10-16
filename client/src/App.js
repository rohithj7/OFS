import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Account from "./Components/Account";
import Fruits from "./Components/Products/Fruits";
import Vegetables from "./Components/Products/Vegetables";
import Meats from "./Components/Products/Meats";
import Dairy from "./Components/Products/Dairy";
import Snacks from "./Components/Products/Snacks";
import Meals from "./Components/Products/Meals";
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
          <Route path="/Account" element={<Account />}></Route>
          <Route path="/Products/Fruits" element={<Fruits />}></Route>
          <Route path="/Products/Vegetables" element={<Vegetables />}></Route>
          <Route path="/Products/Meats" element={<Meats />}></Route>
          <Route path="/Products/Dairy" element={<Dairy />}></Route>
          <Route path="/Products/Snacks" element={<Snacks />}></Route>
          <Route path="/Products/Meals" element={<Meals />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
