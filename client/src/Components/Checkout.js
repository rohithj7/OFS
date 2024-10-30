import React from "react";
import { Link } from "react-router-dom";

export default function Checkout() {

    return (
        <section class="mb-lg-5 mb-5 mt-5">
            <div class="ms-xs-2 ms-sm-3 ms-md-3 ms-lg-4 ms-xl-5">
                <h1 class="ms-1 fw-bold mb-5">Checkout</h1>
            </div>
            
            <div>
                <div class="row">
                    <div class="col-lg-6 col-md-12 ms-lg-3 ms-xl-5">
                        <div id="accordionFlushExample" class="accordion accordion-flush border-box">
                            <div class="py-4 accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <a class="fs-5 text-inherit h4" href="">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2 text-muted">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg> */}
                                                Delivery address
                                            </a>
                                        </div>
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="mt-3 card">
                                            
                                                <div class="p-6 card-body">
                                                    <p class="">
                                                        Jitu Chauhan<br></br>
                                                        4450 North Avenue Oakland, <br></br>
                                                        Nebraska  United States <br></br>
                                                        402-776-1106 
                                                    </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="py-4 accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <a class="fs-5 text-inherit h4" href="">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2 text-muted">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg> */}
                                                Additional Instructions
                                            </a>
                                        </div>
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="mt-3 card">
                                            {/* <div class="mt-5">
                                                <label class="form-label" for="DeliveryInstructions">Delivery instructions</label>
                                                <textarea rows="3" placeholder="Write delivery instructions " class="form-control"></textarea>
                                                <p class="form-text">Add instructions for how you want your order shopped and/or delivered</p>
                                            </div>
                                            <div class="mt-5 d-flex justify-content-end">
                                                <button type="button" class="text-muted btn btn-outline-gray-400">Prev</button>
                                                <button type="button" class="ms-2 btn btn-primary">Next</button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="py-4 accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <a class="fs-5 text-inherit h4" href="">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2 text-muted">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg> */}
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
                            {/* <div class="py-4 accordion-item">
                                <div class="d-flex justify-content-between align-items-center">
                                    <a class="fs-5 text-inherit h4" href="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2 text-muted">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        Add delivery address
                                    </a>
                                
                                </div>
                                <div id="flush-collapseOne" class="accordion-collapse collapse show">
                                    <div class="mt-5">
                                        <div class="row">
                                            <div class="mb-4 col-lg-6 col-12">
                                                <div class="card">
                                                    <div class="p-6 card-body">
                                                        <p class="mb-6">
                                                            Jitu Chauhan<br></br>
                                                            4450 North Avenue Oakland, <br></br>
                                                            Nebraska  United States <br></br>
                                                            402-776-1106 
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="py-4 accordion-item">
                                <a class="text-inherit h5" href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2 text-muted">
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                        <line x1="3" y1="6" x2="21" y2="6"></line>
                                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                                    </svg>
                                    Delivery instructions
                                </a>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse show">
                                    <div class="mt-5">
                                        <label class="form-label" for="DeliveryInstructions">Delivery instructions</label>
                                        <textarea rows="3" placeholder="Write delivery instructions " class="form-control"></textarea>
                                        <p class="form-text">Add instructions for how you want your order shopped and/or delivered</p>
                                    </div>
                                    <div class="mt-5 d-flex justify-content-end">
                                        <button type="button" class="text-muted btn btn-outline-gray-400">Prev</button>
                                        <button type="button" class="ms-2 btn btn-primary">Next</button>
                                    </div>
                                </div>
                            </div> */}
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