import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Welcome Section */}
      <div className="container text-center my-5">
        <h1>Welcome!</h1>

        {/* Categories Section */}
        <h2 className="my-4">Categories</h2>
        <div className="row justify-content-center">
          <Link className="col-2" to="/Products/Fruits">
            <img
              src="Assets/fruits.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Fruits"
            />
            <p>Fruits</p>
          </Link>
          <Link className="col-2" to="/Products/Vegetables">
            <img
              src="Assets/vegetables.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Vegetables"
            />
            <p>Vegetables</p>
          </Link>
          <Link className="col-2" to="/Products/Meats">
            <img
              src="Assets/meats.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Meats"
            />
            <p>Meats</p>
          </Link>
          <Link className="col-2" to="/Products/Dairy">
            <img
              src="Assets/dairy.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Dairy"
            />
            <p>Dairy</p>
          </Link>
          <Link className="col-2" to="/Products/Snacks">
            <img
              src="Assets/snacks.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Snacks"
            />
            <p>Snacks</p>
          </Link>
          <Link className="col-2" to="/Products/Meals">
            <img
              src="Assets/meals.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Meals"
            />
            <p>Meals</p>
          </Link>
        </div>

        {/* Featured Items Section */}
        <h2 className="my-4">Featured Items</h2>
        <div className="row justify-content-center">
          <Link className="col-2" to="">
            <img
              src="Assets/apples.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Apples"
            />
            <p>Apples</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="Assets/coconut milk.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="coconut milk"
            />
            <p>Coconut Milk</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="Assets/ribeye steak.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Raw Ribeye Steak"
            />
            <p>Raw Ribeye Steak</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="Assets/bell peppers.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Bell Peppers"
            />
            <p>Bell Peppers</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="Assets/corn.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Corn"
            />
            <p>Corn</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="Assets/raspberries.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="Raspberries"
            />
            <p>Raspberries</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
