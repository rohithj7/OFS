import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
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

  
const [theData, setData] = useState([]);
  useEffect(() => {
    
      axios.get(`http://localhost:8080/products`)
        .then( res => 
          {
            console.log(res)
            setData(res.data.data)
          })
          
        .catch(err => {console.log(err)});
      }, [])

      // if (response.status === 200) {
        /* const { token } = response.data; // Extract the token from the response
        // Store the token in cookies (expires in 7 days)
        Cookies.set("token", token, { expires: 7, path: "/" }); */
        // Redirect to home page on successful login
        // navigate("/Home"); 
      // }
    // console.log(data === Object(data));
    // onsole.log(theData);
  return (
    <>
      <div>
        
        
        <div className="container my-5">
          {/* Product Section */}
          <div class="mb-4 bg-light border-0 card">
            <div class="p-9 card-body">
              <h2 class="mb-0 fs-1 mb-2">Fruits</h2>
              {/* search bar */}
              <form class="">
                <div class="input-group">
                  <input placeholder="Search for products" class="rounded form-control product-search" type="search"></input>
                  <span class="input-group-append">
                    <button type="button" class="border border-start-0 ms-n10 rounded-0 rounded-end btn btn-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </button>
                  </span>
                </div>
              </form>
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

                    {/* {data.map((product) => {
                      return(
                      <h5 key={product.id} class="text-dark">{product.PRODUCTNAME}</h5>)
                    })} */}

                    {/* {Array.isArray(data) && data?.map(product => {
                            return (
                              <h5 key={product.id} class="text-dark">{product.PRODUCTNAME}</h5>
                            );
                          })} */}

                    {/* {Array.isArray(data) && data?.map((product, index) => {
                            return (
                              <h5 key={index} class="text-dark">{product.PRODUCTNAME}</h5>
                            );
                          })}
                     */}

                     {
                      theData?.map((d, i) => {
                        return <p key={i}>{d.BRAND}</p>
                      })
                     }
                     {/* {data && <h5 class="text-dark">{data.PRODUCTNAME}</h5>} */}
                   
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
                    <div className="p-5 modal-body">
                      <div className="position-absolute top-0 end-0 me-3 mt-3">
                        <button
                          type="button"
                          className="btn-close btn-close-primary close-modal"
                          onClick={toggleModal}
                        ></button>
                      </div>

                      {/* things to include in product description: PRODUCTNAME, PRODUCTDESCRIPTION, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT */}
                      <div className="row">
                        <div className="col-lg-6">
                            <img
                          src="/Assets/apples.jpeg"
                          className="img-fluid"
                          alt="Apples"
                        />
                        </div>
                        <div className="col-lg-6">
                          <div class="ps-lg-8 mt-6 mt-lg-0">
                            {/* ps => padding start (I think) */}
                            <h2 class="mb-4 h1">Apples</h2> {/* Product Name */}
                            <hr class="my-6 mt-4"></hr> {/* horizontal line */}
                            <span class="fs-4 text-dark">$1 per unit</span> {/* Product Price */}
                            <div class="fs-5 text-dark mt-2">1 ounce per unit</div> {/* Product Weight */}
                            <div class="w-25 mt-4"> {/* Product Quantity */}
                              <div class="input-spinner input-group">
                                {/* plus button */}
                                <button type="button" class="button-minus btn btn-sm text-dark border">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                                  </svg>
                                </button>
                                {/* <input type="text" class="form-control form-control-sm text-center" value="1"></input> */}
                                <input type="number" class="form-control text-center" min="1" name="quantity"></input>
                                {/* minus button */}
                                <button type="button" class="button-plus btn btn-sm text-dark border">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div class="mt-4 justify-content-start g-2 align-items-center row">
                              <div class="d-grid col-lg-4 col-md-5 col-6">
                                {/* Add to cart button */}
                                <button type="button" class="btn btn-green">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus me-2" viewBox="0 0 16 16">
                                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                  </svg>
                                  Add to cart
                                  </button>
                                </div>
                              </div>
                            <hr class="my-6 mt-4"></hr>
                            <div>
                              <table class="table table-borderless">
                                <tbody>
                                  <tr>
                                    <td class="text-secondary">Product ID:</td>
                                    <td class="text-secondary">1</td>
                                  </tr>
                                  <tr>
                                    <td class="text-secondary">Availability:</td>
                                    <td class="text-secondary">In Stock</td>
                                  </tr>
                                  <tr>
                                    <td class="text-secondary">Type:</td>
                                    <td class="text-secondary">Fruits</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          
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
