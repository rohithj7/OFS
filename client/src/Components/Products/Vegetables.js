import React from "react";
import { Link } from "react-router-dom";
export default function Vegetables() {
  return (
    <div>
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
