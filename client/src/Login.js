import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Login() {

  return (
    <div className ='login d-flex justify-content-center align-items-center vh-100'>
      <div className='bg-white p-4 rounded-4 w-25'>
        <h2 className='text-center'>Login</h2>
           <form action="">
               <div className='mb-3'>
                   <label htmlFor="email"><strong>Email</strong></label>
                   <input type="text" placeholder='Email' name='theEmail' className='form-control form-control-md rounded-2'/>
               </div>
               <div className='mb-3'>
                   <label htmlFor="password"><strong>Password</strong></label>
                   <input type="password" placeholder='Password' name='thePassword' className='form-control form-control-md rounded-2'/>
               </div>
              
              
               <Link to="/Home" className='btn btn-md btn-dark w-100 px-5'><strong>Login</strong></Link>
                <p></p>
                
           </form>
      </div>
   </div>
  );
  }