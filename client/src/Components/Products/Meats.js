import React from "react";
import { Link } from "react-router-dom";
export default function Meats() {
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
        <h2 className="my-4">Meats</h2>
        <div className="row justify-content-center">
          <Link className="col-2" to="">
            <img
              src="/Assets/chicken thighs.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Chicken Thighs"
            />
            <p>Chicken Thighs</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/chicken breast.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Chicken Breast"
            />
            <p>Chicken Breast</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/pork chops.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Pork Chops"
            />
            <p>Pork Chops</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/turkey breast.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Turkey Breast"
            />
            <p>Turkey Breast</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/lamb chops.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Lamb Chops"
            />
            <p>Lamb Chops</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/bacon.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Bacon"
            />
            <p>Bacon</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/ham.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Ham"
            />
            <p>Ham</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/sausages.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Sausages"
            />
            <p>Sausages</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/beef brisket.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Beef Brisket"
            />
            <p>Beef Brisket</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/ribeye steak.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="ribeye steak"
            />
            <p>Ribeye Steak</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/ground beef.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Ground Beef"
            />
            <p>Ground Beef</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/salmon fillet.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Salmon Fillet"
            />
            <p>Salmon Fillet</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
