import React from "react";
import { Link } from "react-router-dom";

export default function Checkout() {

//      // Fetch customer info when the component loads
//   useEffect(() => {
//     const loadCheckoutPage = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/customerinfo", {
//           withCredentials: true,
//         });

//         setFormData({
//           firstName: response.data.FIRSTNAME || "",
//           lastName: response.data.LASTNAME || "",
//           phone: response.data.PHONE || "",
//           address: response.data.ADDRESS || "",
//         });
//       } catch (error) {
//         console.error("Error fetching customer info:", error);
//         setErrorMessage("Failed to load customer information.");
//       }
//     };
//     fetchCustomerInfo();
//   }, []);

    return (
        <section class="mb-lg-5 mb-5 mt-5">
            <div class="ms-sm-4 ms-md-4 ms-lg-5 ms-xl-5 me-sm-0 me-lg-5 me-xl-5">
                <h1 class="ms-1 fw-bold mb-5 d-flex justify-content-between">
                    Checkout
                    <button type="button" class="me-4 btn btn-green text-white fw-bold fs-5">Place order</button>
                </h1>
               
            </div>
            
            <div>
                <div class="row">
                    <div class="col-lg-6 col-md-12 ms-md-2 ms-lg-3 ms-xl-5">
                        <div id="accordionFlushExample" class="accordion accordion-flush border-box">
                            <div class="py-4 accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <a class="fs-4 text-inherit h4 text-decoration-none" href="">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2 text-muted">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-geo-alt me-1 text-secondary" viewBox="0 0 16 16"> 
                                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                </svg>
                                                Delivery address
                                            </a>
                                        </div>
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="mt-3 card">
                                            
                                                <div class="p-3 card-body">
                                                    <p class="">
                                                        Jitu Chauhan<br></br>
                                                        4450 North Avenue Oakland, <br></br>
                                                        Nebraska  United States
                                                    </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="py-4 accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <a class="fs-4 text-inherit h4 text-decoration-none" href="">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-pencil-square me-2 text-secondary" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                </svg>
                                                Additional Instructions
                                            </a>
                                        </div>
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="mt-3 card border-0">
                                            <div class="">
                                                <label class="form-label">Delivery instructions</label>
                                                <textarea rows="3" placeholder="Write delivery instructions " class="form-control"></textarea>
                                                <p class="form-text">Add instructions for how you want your order shopped and/or delivered</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div class="py-4 accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <div class="d-flex justify-content-between align-items-center">
                                        <a class="fs-4 text-inherit h4 text-decoration-none" href="">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-credit-card me-2 text-secondary" viewBox="0 0 16 16">
                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                            </svg>
                                                Payment
                                            </a>
                                        </div>
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="mt-3 card">
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="col-lg-5 col-md-12 col-12 ms-lg-1">
                        <div class="mt-4 mt-lg-0" style={{mw: "390px"}}>
                            <div class="shadow-sm card">
                                <h5 class="px-4 py-4 bg-transparent mb-0">Order Details</h5>
                                <ul class="list-group list-group-flush">
                                    <li class="px-4 py-3 list-group-item">
                                        <div class="align-items-center row">
                                            <div class="col-md-2 col-2">
                                                <img src="/Assets/carrots.jpeg" alt="Ecommerce" class="img-fluid"></img>
                                            </div>
                                            <div class="col-md-5 col-5">
                                                <h6 class="mb-0">Carrots</h6>
                                                <span><small class="text-muted">200g</small></span>
                                            </div>
                                            <div class="text-center text-muted col-md-2 col-2">
                                                <span>1</span>
                                            </div>
                                            <div class="text-lg-end text-start text-md-end col-md-3 col-3">
                                                <span class="fw-bold">$21.60</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="px-4 py-3 list-group-item">
                                        <div class="align-items-center row">
                                            <div class="col-md-2 col-2">
                                                <img src="/Assets/whole milk.jpeg" alt="Ecommerce" class="img-fluid"></img>
                                            </div>
                                            <div class="col-md-5 col-5">
                                                <h6 class="mb-0">Whole Milk</h6>
                                                <span><small class="text-muted">200g</small></span>
                                            </div>
                                            <div class="text-center text-muted col-md-2 col-2">
                                                <span>1</span>
                                            </div>
                                            <div class="text-lg-end text-start text-md-end col-md-3 col-3">
                                                <span class="fw-bold">$21.60</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="px-4 py-3 list-group-item">
                                        <div class="align-items-center row">
                                            <div class="col-md-2 col-2">
                                                <img src="/Assets/strawberries.jpg" alt="Ecommerce" class="img-fluid"></img>
                                            </div>
                                            <div class="col-md-5 col-5">
                                                <h6 class="mb-0">Strawberries</h6>
                                                <span><small class="text-muted">200g</small></span>
                                            </div>
                                            <div class="text-center text-muted col-md-2 col-2">
                                                <span>1</span>
                                            </div>
                                            <div class="text-lg-end text-start text-md-end col-md-3 col-3">
                                                <span class="fw-bold">$21.60</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="px-4 py-3 list-group-item">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div>Item Subtotal</div>
                                            <div class="fw-bold">$93.55</div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div>Total Weight</div>
                                            <div class="fw-bold">12 ounces</div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <div>Delivery Fee</div>
                                            <div class="fw-bold">$0.00</div>
                                        </div>
                                    </li>
                                    <li class="px-4 py-3 list-group-item">
                                        <div class="d-flex align-items-center justify-content-between mb-2 fw-bold">
                                            <div>Grand Total</div>
                                            <div class="fw-bold">$93.55</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
            
        </section>

    )
}