import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Fruits() {
  /* const itemToDisplay = document.querySelectorAll('.product');
  const category = document.getElementById("category");
  
  itemToDisplay.addEventListener('click', () => {
    document.querySelector('.product')?.classList.remove(product);
    // itemToDisplay.classList.add('active');
  }); */

  const [modal, setModal] = useState(false);
  // if the state is false it will go to true, and if it is true it will go to false

  const toggleModal = () => {
    setModal(!modal);
  };

  // prevents scrolling of anything outside the modal (in the background)
  if (modal) {
    document.body.classList.add("active-modl");
  } else {
    document.body.classList.remove("active-modl");
  }

  return (
    <>
      <div>
        
        
        <div className="container my-5">
          {/* Product Section */}
          <div class="mb-4 bg-light border-0 card">
            <div class="p-9 card-body">
              <h2 class="mb-0 fs-1">Fruits</h2>
            </div>
          </div>

          <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-2 row-cols-12 justify-content-center g-6 mt-2 undefined">
            {/* rows-col-xl-6 => there should be six columns when the user's screen size is xl (≥1200px); rows-col-lg-4 => there should be four columns when the user's screen size is l (≥992px) */}
            <div className="col mb-4">
              <div className="card-product card border-2">
                
                <div className="card-body">
                  <Link
                    className="text-decoration-none text-center"
                    onClick={toggleModal}
                    to="">
                    <img
                      src="/Assets/apples.jpeg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="apples"
                    />
                    <h5 class="text-dark">Apples</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                   <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/raspberries.jpeg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Raspberries"
                    />
                    <h5 class="text-dark">Raspberries</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                   <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/bananas.jpg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Bananas"
                    />
                    <h5 class="text-dark">Bananas</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                   <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/pineapples.jpg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Pineapples"
                    />
                    <h5 class="text-dark">Pineapples</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                   <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/blueberries.jpg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Blueberries"
                    />
                    <h5 class="text-dark">Blueberries</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                   <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/blackberries.jpg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Blackberries"
                    />
                    <h5 class="text-dark">Blackberries</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                  <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/grapes.jpg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Grapes"
                    />
                    <h5 class="text-dark">Grapes</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                  <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/oranges.jpg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Oranges"
                    />
                    <h5 class="text-dark">Oranges</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                   <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/pears.jpg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Pears"
                    />
                    <h5 class="text-dark">Pears</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                   <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/strawberries.jpg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Strawberries"
                    />
                    <h5 class="text-dark">Strawberries</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                  <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/peaches.jpeg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Peaches"
                    />
                    <h5 class="text-dark">Peaches</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card-product card border-2">
                <div className="card-body">
                   <Link className="text-decoration-none text-center" onClick={toggleModal} to="">
                    <img
                      src="/Assets/watermelons.jpeg"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="Watermelons"
                    />
                    <h5 class="text-dark">Watermelons</h5>
                  </Link>
                  <div class="text-small mb-1 text-muted text-center">$1 per unit</div>
                  <div className="d-flex justify-content-center mt-3">
                    <div>
                      <Link className="btn btn-sm btn bg-green text-light fw-bolder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                          />
                        </svg>
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center"></div>
        </div>
      </div>

      {/* if modal is true, then return this, otherwise don't return anything */}
      {modal && (
        <div>
          <div className="fade modal-backdrop show"></div>

          <div
            role="dialog"
            aria-modal="true"
            className="fade modal show"
            tabindex="-1"
            style={{ paddingLeft: "0px", display: "block" }}
          >
            <div
              id="quickViewModal"
              className="modal-dialog modal-xl modal-dialog-centered"
            >
              <div className="modal-content">
                <div className="modal-content-dialog">
                  <div className="modal-content-content">
                    <div className="p-8 modal-body">
                      <div className="position-absolute top-0 end-0 me-3 mt-3">
                        <button
                          type="button"
                          className="btn-close btn-close-primary close-modal"
                          onClick={toggleModal}
                        ></button>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <p>
                            {" "}
                            hih hihihisdhfisdfshfosifsdjofjsofsfsdsdfdsfdsfdssf
                          </p>
                          <p>
                            {" "}
                            hih hihihisdhfisdfshfosifsdjofjsofsfsdsdfdsfdsfdssf
                          </p>
                          <p>
                            {" "}
                            hih hihihisdhfisdfshfosifsdjofjsofsfsdsdfdsfdsfdssf
                          </p>
                          <p>
                            {" "}
                            hih hihihisdhfisdfshfosifsdjofjsofsfsdsdfdsfdsfdssf
                          </p>
                          <p>
                            {" "}
                            hih hihihisdhfisdfshfosifsdjofjsofsfsdsdfdsfdsfdssf
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
