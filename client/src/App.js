import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Login from './Login.js';
import Home from './Home.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import './App.scss';
import './main.scss';


function App() {
  return(
  <div>
      <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
      </Routes>
 
      </BrowserRouter>
      
    </div>
  );
}

export default App;
