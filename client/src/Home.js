import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Home() {

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary"> 
    {/* bg-body-tertiary makes the background of the navbar a grayish color */}
    <div class="container"> {/* having container instead of container-fluid gives gap before GroceryGo title */}
    <a class="navbar-brand" href="#">GroceryGo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav ms-auto"> {/* navbar-nav makes the height of the navbar smaller */}
      <button class="btn me-2" type="button">Items</button>
      <button class="btn me-2" type="button">Cart</button>
      <button class="btn me-2" type="button">Checkout</button>
      <button class="btn me-2" type="button">Orders</button>
      <button class="btn me-2" type="button">My Account</button>
      <Link to="/Login" class="btn me-2" type="button">Login</Link>
      </ul> 
      
    </div>

  </div>
  </nav>
    
    
    
  );
  }