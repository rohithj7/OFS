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

        {/* Categories Section */}
        <h2 className="my-4">Categories</h2>
        <div className="row justify-content-center">
          <Link className="col-2" to="/category/fruits">
            <img
              src="Assets/fruits.jpeg"
              className="img-fluid rounded-circle"
              alt="Fruits"
            />
            <p>Fruits</p>
          </Link>
          <Link className="col-2" to="/category/vegetables">
            <img
              src="Assets/vegetables.jpeg"
              className="img-fluid rounded-circle"
              alt="Vegetables"
            />
            <p>Vegetables</p>
          </Link>
          <Link className="col-2" to="/category/meats">
            <img
              src="Assets/meats.jpeg"
              className="img-fluid rounded-circle"
              alt="Meats"
            />
            <p>Meats</p>
          </Link>
          <Link className="col-2" to="/category/dairy">
            <img
              src="Assets/dairy.jpeg"
              className="img-fluid rounded-circle"
              alt="Dairy"
            />
            <p>Dairy</p>
          </Link>
          <Link className="col-2" to="/category/snacks">
            <img
              src="Assets/snacks.jpeg"
              className="img-fluid rounded-circle"
              alt="Snacks"
            />
            <p>Snacks</p>
          </Link>
          <Link className="col-2" to="/category/meals">
            <img
              src="Assets/meals.jpeg"
              className="img-fluid rounded-circle"
              alt="Meals"
            />
            <p>Meals</p>
          </Link>
        </div>

        {/* Featured Items Section */}
        <h2 className="my-4">Featured Items</h2>
        <div className="row justify-content-center">
          <Link className="col-2" to="/item/apples">
            <img
              src="Assets/apples.jpeg"
              className="img-fluid rounded-circle"
              alt="Apples"
            />
            <p>Apples</p>
          </Link>
          <Link className="col-2" to="/item/bread">
            <img
              src="Assets/french loaf bread.jpeg"
              className="img-fluid rounded-circle"
              alt="French Loaf Bread"
            />
            <p>Bread</p>
          </Link>
          <Link className="col-2" to="/item/ribeye-steak">
            <img
              src="Assets/ribeye steak.jpeg"
              className="img-fluid rounded-circle"
              alt="Raw Ribeye Steak"
            />
            <p>Raw Ribeye Steak</p>
          </Link>
          <Link className="col-2" to="/item/frozen-peas">
            <img
              src="Assets/frozen peas.jpeg"
              className="img-fluid rounded-circle"
              alt="Frozen Peas"
            />
            <p>Frozen Peas</p>
          </Link>
          <Link className="col-2" to="/item/corn">
            <img
              src="Assets/corn.jpeg"
              className="img-fluid rounded-circle"
              alt="Corn"
            />
            <p>Corn</p>
          </Link>
          <Link className="col-2" to="/item/raspberries">
            <img
              src="Assets/raspberries.jpeg"
              className="img-fluid rounded-circle"
              alt="Raspberries"
            />
            <p>Raspberries</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
