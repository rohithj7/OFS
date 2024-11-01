import React from "react";
import { Link } from "react-router-dom";
export default function Dairy() {
  return (
    <div>
      {/* Welcome Section */}
      <div className="container text-center my-5">
        <h1>Welcome!</h1>
        {/* Product Section */}
        <h2 className="my-4">Dairy</h2>
        <div className="row justify-content-center">
          <Link className="col-2" to="">
            <img
              src="/Assets/whole milk.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="whole milk"
            />
            <p>Whole Milk</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/cheddar cheese.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="cheddar cheese"
            />
            <p>Cheddar Cheese</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/butter.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="butter"
            />
            <p>Butter</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/yogurt.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="yogurt"
            />
            <p>Yogurt</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/cream cheese.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="cream cheese"
            />
            <p>Cream Cheese</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/sour cream.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="sour cream"
            />
            <p>Sour Cream</p>
          </Link>
        </div>
        <div className="row justify-content-center">
          <Link className="col-2" to="">
            <img
              src="/Assets/cottage cheese.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="cottage cheese"
            />
            <p>Cottage Cheese</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/heavy cream.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="heavy cream"
            />
            <p>Heavy Cream</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/whipped cream.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="whipped cream"
            />
            <p>Whipped Cream</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/coconut milk.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="coconut"
            />
            <p>Coconut milk</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/kefir.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="kefir"
            />
            <p>Kefir</p>
          </Link>
          <Link className="col-2" to="">
            <img
              src="/Assets/oat milk.jpeg"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              alt="oat milk"
            />
            <p>Oat Milk</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
