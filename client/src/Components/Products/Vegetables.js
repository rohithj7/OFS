import React from "react";
import { Link } from "react-router-dom";
export default function Vegetables() {
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
              <button className="btn me-2" type="button">
                My Account
              </button>
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
      {/* Welcome Section */}
      <div className="container text-center my-5">
        <h1>Welcome!</h1>
        {/* Product Section */}
        <h2 className="my-4">Vegetables</h2>
        <div className="row justify-content-center">
          <Link className="col-2" to="">
            <img
              src="/Assets/corn.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="corn"
            />
            <p>Corn</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/lettuce.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Lettuce"
            />
            <p>Lettuce</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/tomatoes.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="tomatoes"
            />
            <p>Tomatoes</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/onions.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Onions"
            />
            <p>Onions</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/potatoes.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Potatoes"
            />
            <p>Potatoes</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/kale.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Kale"
            />
            <p>Kale</p>
          </Link>
        </div>
        <div className="row justify-content-center">
          <Link className="col-2" to="">
            <img
              src="/Assets/mushrooms.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Mushrooms"
            />
            <p>Mushrooms</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/green beans.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Green Beans"
            />
            <p>Green Beans</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/broccoli.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Broccoli"
            />
            <p>Broccoli</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/carrots.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Carrots"
            />
            <p>Carrots</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/cucumbers.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Cucumbers"
            />
            <p>Cucumbers</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/eggplant.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Eggplant"
            />
            <p>Eggplant</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
