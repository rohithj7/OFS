import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-green">
        {/* bg-green makes the background of the navbar a greenish color */}
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            GroceryGo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto">
              {/* Home Button */}
              <Link to="/Home" className="btn me-2" type="button">
                Items
              </Link>
              <button className="btn me-2" type="button">
                Cart
              </button>
              <button className="btn me-2" type="button">
                Checkout
              </button>
              <button className="btn me-2" type="button">
                Orders
              </button>
             {/* Login Button */}
              <Link to="/Account" className="btn me-2" type="button">
                My Account
              </Link>
              {/* Login Button */}
              <Link to="/Login" className="btn me-2" type="button">
                Login
              </Link>
              {/* Sign Up Button */}
              <Link to="/Signup" className="btn me-2" type="button">
                Sign Up
              </Link>
            </ul>
          </div>
        </div>
      </nav>

      {/* Account information Section */}
      <div className="container text-center my-5">
        <div class="card border-0"> 
        {/* border-0 removes the border from the card */}
            <div class="card-body ms-5">
                
                <div class="fs-2 mb-3 mt-2 ms-3 text-start fw-bold">
                    {/* fs => font-size; mb => margin bottom ; mt => margin top; ms => margin left (start); fw => font weight */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="100px" height= "100px" class="bi bi-person-circle" viewBox="0 0 16 16"
                    style={{ paddingRight:"20px"}}>
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
                    </svg>
                    Your Profile
                </div>
                <div class="ms-5 mt-3">
                    <form class="ms-5">
                        <div class="ms-5 row mb-4">
                            <label for="" class="card-text text-start fw-bold fs-4 col-sm-2">Name:</label>
                            {/* col-sm-2 affects the horizontal space for the label */}
                            <div class="col-sm-5"> {/* col-sm-5 affects the size of the input */}
                                <input type="" class="form-control" id="" placeholder="Name"></input>
                            </div>
                        </div>
                        <div class="ms-5 row mb-4">
                            <label for="" class="card-text text-start fw-bold fs-4 col-sm-2">Username:</label>
                            <div class="col-sm-5"> {/* col-sm-5 affects the size of the input */}
                                <input type="" class="form-control" id="" placeholder="Username"></input>
                            </div>
                        </div>
                        <div class="ms-5 row mb-4">
                            <label for="" class="card-text text-start fw-bold fs-4 col-sm-2">Address:</label>
                            <div class="col-sm-5"> {/* col-sm-5 affects the size of the input */}
                                <input type="" class="form-control" id="" placeholder="Address"></input>
                            </div>
                        </div>
                        <div class="ms-5 row mb-4">
                            <label for="" class="card-text text-start fw-bold fs-4 col-sm-2">Password:</label>
                            <div class="col-sm-5"> {/* col-sm-5 affects the size of the input */}
                                <input type="password" class="form-control" id="" placeholder="Password"></input>
                            </div>
                        </div>
                    </form>
                </div>   
                
                
                {/* right aligns the buttons */}
                <div class="d-grid gap-2 d-md-flex justify-content-md-end me-5">
                 {/* me => margin-right (end)*/}
                    <Link to="" className="btn btn-lg bg-pastelblue text-light fw-bold" type="button">Delete</Link> {/* text-light: makes button text white */}
                    <Link to="" className="btn btn-lg bg-mint text-light fw-bold" type="button">Save</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
