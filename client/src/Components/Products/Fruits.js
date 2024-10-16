import React from "react";
import { Link } from "react-router-dom";
export default function Fruits() {
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
        <h2 className="my-4">Fruits</h2>
        <div className="row justify-content-center">
          <Link className="col-2" to="">
            <img
              src="/Assets/apples.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="apples"
            />
            <p>Apples</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/raspberries.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Raspberries"
            />
            <p>Raspberries</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/bananas.jpg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Bananas"
            />
            <p>Bananas</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/pineapples.jpg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Pineapples"
            />
            <p>Pineapples</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/blueberries.jpg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Blueberries"
            />
            <p>Blueberries</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/blackberries.jpg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Blackberries"
            />
            <p>Blackberries</p>
          </Link>
        </div>
        <div className="row justify-content-center">
          <Link className="col-2" to="">
            <img
              src="/Assets/grapes.jpg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Grapes"
            />
            <p>Grapes</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/oranges.jpg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Oranges"
            />
            <p>Oranges</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/pears.jpg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Pears"
            />
            <p>Pears</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/strawberries.jpg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Strawberries"
            />
            <p>Strawberries</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/peaches.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Peaches"
            />
            <p>Peaches</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/watermelons.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Watermelons"
            />
            <p>Watermelons</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
