import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function EmployeeDashboard() {
    const [viewProductsModal, setViewProductsModal] = useState(false);

    // Toggle modal
    const toggleViewProductsModal = () => {
        setViewProductsModal(!viewProductsModal); // Toggle modal open or closed
    };

    return (
        <>
        <div class="mt-5 container">
        <div class="row">
                <div class="mt-5 mb-5 col-xl-12 col-lg-12 col-md-12 col-12">
                    <div class="h-100 card-lg card border border-2">
                        <h3 class="p-4 my-2 fs-5 text-center">Orders to Fulfill</h3>
                        <div class="p-0 card-body">
                            <div class="table-responsive rounded-1">
                                <table class="mb-0 table-centered text-nowrap table table-borderless table-hover">
                                <thead class="table-light text-center">
                                    <tr class="text-center">
                                        <th colspan="1">
                                            <div class="py-3">Order ID</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Date</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Total</div>
                                        </th>
                                        {/* <th colspan="1"><div class="py-4 text-uppercase">Order Status</div></th> */}
                                        <th colspan="1">
                                            <div class="py-3">Status</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">View Products</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Complete Order</div>
                                        </th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr class="text-center">
                                            <th class="py-4 align-middle">152323234</th>
                                            <td class="py-4 align-middle">11/4/24</td>
                                            <td class="py-4 align-middle me-5">$123.23</td>
                                            <td class="py-4 align-middle">
                                                <span class="p-2 text-uppercase badge bg-mint">Ongoing</span>
                                                
                                            </td>
                                            <td class="py-4 align-middle">
                                                <Link class="btn btn-pastelblue btn-sm fw-bold text-white" onClick={() => toggleViewProductsModal()}> 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-eye fs-4 me-2" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                                    </svg>
                                                    <span class="">View Products</span>
                                                </Link>
                                            </td>
                                            <td class="py-4 align-middle">
                                                <Link class="completeButton btn border border-2 border-green btn-sm fw-bold">
                                                    <span class="me-2">Complete</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-check-circle-fill fs-4 completeIcon" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                    </svg>
                                                </Link>
                                            </td>
                                            
                                        </tr>
                                        <tr class="text-center">
                                            <th class="py-4 align-middle">152323234</th>
                                            <td class="py-4 align-middle">11/4/24</td>
                                            <td class="py-4 align-middle me-5">$123.23</td>
                                            <td class="py-4 align-middle">
                                                <span class="p-2 text-uppercase badge bg-mint">Ongoing</span>
                                                
                                            </td>
                                            <td class="py-4 align-middle">
                                                <Link class="btn btn-pastelblue btn-sm fw-bold text-white" onClick={() => toggleViewProductsModal()}> 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-eye fs-4 me-2" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                                    </svg>
                                                    <span class="">View Products</span>
                                                </Link>
                                            </td>
                                            <td class="py-4 align-middle">
                                            <Link class="completeButton btn border border-2 border-green btn-sm fw-bold">
                                                    <span class="me-2">Complete</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-check-circle-fill fs-4 completeIcon" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                    </svg>
                                                </Link>
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {viewProductsModal && (
            <div>
                <div class="fade modal-backdrop show"></div>
                <div role="dialog" aria-modal="true" class="fade modal show" tabindex="-1" style={{paddingLeft: "0px", display: "block"}}>
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-content-dialog">
                                <div class="modal-content-content">
                                    <div class="p-5 modal-body rounded-3">
                                        <div class="position-absolute top-0 end-0 me-3 mt-3">
                                            <button type="button" class="btn-close btn-close-primary close-modal" onClick={toggleViewProductsModal}></button>
                                        </div>
                                        

                                        <div class="card-lg card border-0">
                                            
                                            <div class="card-body">
                                                <h3 class="text-center mb-4">Products</h3>
                                                <div class="table-responsive-xxl border-0">
                
                                                    <table
                                                        id="ordersTable"
                                                        class="text-nowrap table-centered mt-0 table"
                                                        style={{ width: "100%" }}>
                                                        <thead class="">
                                                        <tr>
                                                            <th colspan="1">
                                                                <div class="text-secondary text-center">Product</div>
                                                            </th>
                                                            <th colspan="1">
                                                                <div class="text-secondary text-center">Brand</div>
                                                            </th>
                                                            <th colspan="1">
                                                                <div class="text-secondary text-center">Quantity</div>
                                                            </th>
                                                            <th colspan="1">
                                                                <div class="text-secondary text-center">Price Per Unit</div>
                                                            </th>
                                                            <th colspan="1">
                                                                <div class="text-secondary text-center">Weight Per Unit</div>
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        
                                                            <tr>
                                                            
                                                                <td class="py-4 align-middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">Oranges</h6>
                                                                    </a>
                                                                </td>
                                                                <td class="py-4 align-middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">
                                                                        Sweet Blossom
                                                                    </h6>
                                                                    </a>
                                                                </td>
                                                                <td class="py-4 -middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">
                                                                        25
                                                                    </h6>
                                                                    </a>
                                                                </td>
                                                                <td class="py-4 -middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">
                                                                        $1.25
                                                                    </h6>
                                                                    </a>
                                                                </td>
                                                                <td class="py-4 -middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">
                                                                        0.25
                                                                    </h6>
                                                                    </a>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                            
                                                                <td class="py-4 align-middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">Oranges</h6>
                                                                    </a>
                                                                </td>
                                                                <td class="py-4 align-middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">
                                                                        Sweet Blossom
                                                                    </h6>
                                                                    </a>
                                                                </td>
                                                                <td class="py-4 -middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">
                                                                        25
                                                                    </h6>
                                                                    </a>
                                                                </td>
                                                                <td class="py-4 -middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">
                                                                        $1.25
                                                                    </h6>
                                                                    </a>
                                                                </td>
                                                                <td class="py-4 -middle border-top-0">
                                                                    <a class="text-decoration-none text-black text-center">
                                                                    <h6 class="mb-0">
                                                                        0.25
                                                                    </h6>
                                                                    </a>
                                                                </td>
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
        )}

        </>
    );
}