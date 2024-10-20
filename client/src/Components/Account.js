import React from "react";
import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div>
      {/* Account information Section */}
      <div className="container text-center my-5">
        <div class="card border-0">
          {/* border-0 removes the border from the card */}
          <div class="card-body ms-5">
            <div class="fs-2 mb-3 mt-2 ms-3 text-start fw-bold">
              {/* fs => font-size; mb => margin bottom ; mt => margin top; ms => margin left (start); fw => font weight */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100px"
                height="100px"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
                style={{ paddingRight: "20px" }}
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                ></path>
              </svg>
              Your Profile
            </div>
            <div class="ms-5 mt-3">
              <form class="ms-5">
                <div class="ms-5 row mb-4">
                  <label
                    for=""
                    class="card-text text-start fw-bold fs-4 col-sm-2"
                  >
                    Name:
                  </label>
                  {/* col-sm-2 affects the horizontal space for the label */}
                  <div class="col-sm-5">
                    {" "}
                    {/* col-sm-5 affects the size of the input */}
                    <input
                      type=""
                      class="form-control"
                      id=""
                      placeholder="Name"
                    ></input>
                  </div>
                </div>
                <div class="ms-5 row mb-4">
                  <label
                    for=""
                    class="card-text text-start fw-bold fs-4 col-sm-2"
                  >
                    Username:
                  </label>
                  <div class="col-sm-5">
                    {" "}
                    {/* col-sm-5 affects the size of the input */}
                    <input
                      type=""
                      class="form-control"
                      id=""
                      placeholder="Username"
                    ></input>
                  </div>
                </div>
                <div class="ms-5 row mb-4">
                  <label
                    for=""
                    class="card-text text-start fw-bold fs-4 col-sm-2"
                  >
                    Address:
                  </label>
                  <div class="col-sm-5">
                    {" "}
                    {/* col-sm-5 affects the size of the input */}
                    <input
                      type=""
                      class="form-control"
                      id=""
                      placeholder="Address"
                    ></input>
                  </div>
                </div>
                <div class="ms-5 row mb-4">
                  <label
                    for=""
                    class="card-text text-start fw-bold fs-4 col-sm-2"
                  >
                    Password:
                  </label>
                  <div class="col-sm-5">
                    {" "}
                    {/* col-sm-5 affects the size of the input */}
                    <input
                      type="password"
                      class="form-control"
                      id=""
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
              </form>
            </div>

            {/* right aligns the buttons */}
            <div class="d-grid gap-2 d-md-flex justify-content-md-end me-5">
              {/* me => margin-right (end)*/}
              <Link
                to=""
                className="btn btn-lg bg-pastelblue text-light fw-bold"
                type="button"
              >
                Delete
              </Link>{" "}
              {/* text-light: makes button text white */}
              <Link
                to=""
                className="btn btn-lg bg-mint text-light fw-bold"
                type="button"
              >
                Save
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
