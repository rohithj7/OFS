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
        <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-2 row-cols-12 justify-content-center g-6 mt-2">
          {/* rows-col-xl-6 => there should be six columns when the user's screen size is xl (≥1200px); rows-col-lg-4 => there should be four columns when the user's screen size is l (≥992px) */}
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link
                  className="text-decoration-none text-center"
                  to="/Products/Fruits/1"
                >
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/fruits.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Fruits"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Fruits
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link
                  className="text-decoration-none text-center"
                  to="/Products/Vegetables/2"
                >
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/vegetables.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Vegetables"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Vegetables
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link
                  className="text-decoration-none text-center"
                  to="/Products/Meats/3"
                >
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/meats.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Meats"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Meats
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link
                  className="text-decoration-none text-center"
                  to="/Products/Dairy/4"
                >
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/dairy.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Dairy"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Dairy
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link
                  className="text-decoration-none text-center"
                  to="/Products/Snacks/5"
                >
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/snacks.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Snacks"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Snacks
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link
                  className="text-decoration-none text-center"
                  to="/Products/Meals/6"
                >
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/meals.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Meals"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Meals
                  </h5>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Items Section */}
        <h2 className="my-4">Featured Items</h2>
        <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-2 row-cols-12 justify-content-center g-6 mt-2">
          {/* rows-col-xl-6 => there should be six columns when the user's screen size is xl (≥1200px); rows-col-lg-4 => there should be four columns when the user's screen size is l (≥992px) */}
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link className="text-decoration-none text-center" to="">
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/apples.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Apples"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Apples
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link className="text-decoration-none text-center" to="">
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/coconut%20milk.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Coconut Milk"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Coconut Milk
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link className="text-decoration-none text-center" to="">
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/ribeye%20steak.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Raw Ribeye Steak"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Raw Ribeye Steak
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link className="text-decoration-none text-center" to="">
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/bell%20peppers.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Bell Peppers"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Bell Peppers
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link className="text-decoration-none text-center" to="">
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/corn.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Corn"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Corn
                  </h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card-product card border-2">
              <div className="card-body">
                <Link className="text-decoration-none text-center" to="">
                  <img
                    src={`https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/raspberries.jpeg?raw=true`}
                    className="img-fluid rounded-circle justify-content-center mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt={"Raspberries"}
                  />
                  <h5 className="text-dark justify-content-center mt-3">
                    Raspberries
                  </h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
