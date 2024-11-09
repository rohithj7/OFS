import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function ManagerDashboard() {
    const [editModal, setEditModal] = useState(false);

    const backgroundStyle = {
        backgroundImage: `url("/Assets/assortedVegetablesForLogin.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    const backgroundOpacity = {
        opacity: "0.5"
    };

    const editStatus = async () => {
        try {
            // sidebar.classList.remove("show"); // Hides the sidebar
        } 
        catch (err) {
        }
    }

    // Toggle modal and set selected product
    const toggleEditModal = () => {
        setEditModal(!editModal); // Toggle modal open or closed
    };

    return(
    <>
        <div class="container">
            <div class="mb-5 row">
                <div class="col-md-12">
                    <div class="border-0 rounded-4 card bg-image mt-5" style={backgroundStyle}>
                        <div class="mask text-light d-flex justify-content-center flex-column text-center rounded-4 p-4" style={{backgroundColor: "rgba(52, 58, 64, 0.5)"}}>
                            <div class="p-lg-12 card-body">
                                <h1 class="text-white fw-bold">Welcome back!</h1>
                                {/* <button type="button" class="btn btn-green p-2 me-3 mb-3">Create Product</button>
                                <button type="button" class="btn btn-green p-2 me-3 mb-3">Create Supplier Order</button>
                                <button type="button" class="btn btn-green p-2 me-3 mb-3">Add Employee Account</button>
                                <button type="button" class="btn btn-green p-2 me-3 mb-3">Add Supplier Account</button> */}
                                <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                    <div class="btn-group me-2" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-green p-2 mb-3">Create Product</button> 
                                    </div>
                                    <div class="btn-group me-2" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-green p-2 mb-3">Edit Product</button> 
                                    </div>
                                    <div class="btn-group me-2" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-green p-2 mb-3">Create Supplier Order</button>                                        
                                    </div>
                                    <div class="btn-group me-2" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-green p-2 mb-3">Add Employee Account</button>
                                    </div>
                                    <div class="btn-group me-2" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-green p-2 mb-3">Add Supplier Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mb-5 row">
                <div class="table-responsive-xl mb-lg-0">
                    <div class="flex-nowrap pb-3 pb-lg-0 row">
                        <div class="mb-6 col-lg-4 col-12">
                            <div class="h-100 card-lg card">
                                <div class="p-6 card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-6">
                                        <div><h4 class="mb-0 fs-5">Total Earnings</h4></div>
                                        <div class="icon-shape icon-md p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-currency-dollar fs-5" viewBox="0 0 16 16">
                                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="lh-1">
                                        <h1 class="mb-2 fw-bold fs-2">$93,438.78</h1>
                                    </div>
                                </div>
                                <div class="card-footer bg-lightergreen border-0">
                                    <div class="row justify-content-between">
                                        <div class="col-auto">
                                            <p class="fs-6 text-muted mb-0">Today's earnings</p>
                                            <p class="fs-5 fw-bold mb-0">$2,230</p>
                                        </div>
                                        <div class="col text-end text-truncate">
                                            <p class="fs-6 text-muted mb-0">Monthly earnings</p>
                                            <p class="fs-5 fw-bold mb-0">$158,990</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div class="mb-6 col-lg-4 col-12">
                            <div class="h-100 card-lg card">
                                <div class="p-6 card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-6">
                                        <div><h4 class="mb-0 fs-5">Total Orders</h4></div>
                                        <div class="icon-shape icon-md p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-cart2 fs-5" viewBox="0 0 16 16">
                                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="lh-1">
                                        <h1 class="mb-2 fw-bold fs-2">234,212</h1>
                                        {/* <span>Monthly revenue</span> */}
                                    </div>
                                </div>
                                <div class="card-footer bg-lightergreen border-0">
                                    <div class="row justify-content-between">
                                        <div class="col-auto">
                                            <p class="fs-6 text-muted mb-0">Today's Orders</p>
                                            <p class="fs-5 fw-bold mb-0">121</p>
                                        </div>
                                        <div class="col text-end text-truncate">
                                            <p class="fs-6 text-muted mb-0">Monthly Orders</p>
                                            <p class="fs-5 fw-bold mb-0">1,944</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-6 col-lg-4 col-12">
                            <div class="h-100 card-lg card">
                                <div class="p-6 card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-6">
                                        <div><h4 class="mb-0 fs-5">Total Customers</h4></div>
                                        <div class="icon-shape icon-md p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-person fs-5" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="lh-1">
                                        <h1 class="mb-2 fw-bold fs-2">39,395</h1>
                                    </div>
                                </div>
                                <div class="card-footer bg-lightergreen border-0">
                                    <div class="row justify-content-between">
                                        <div class="col-auto">
                                            <p class="fs-6 text-muted mb-0">Today's Customers</p>
                                            <p class="fs-5 fw-bold mb-0">57</p>
                                        </div>
                                        <div class="col text-end text-truncate">
                                            <p class="fs-6 text-muted mb-0">Monthly Customers</p>
                                            <p class="fs-5 fw-bold mb-0">681</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="mb-5 col-xl-12 col-lg-12 col-md-12 col-12">
                    <div class="h-100 card-lg card">
                        <h3 class="p-4 my-2 fs-5 text-center">Recent Orders</h3>
                        <div class="p-0 card-body">
                            <div class="table-responsive">
                                <table class="table-centered text-nowrap table table-borderless table-hover">
                                <thead class="table-light text-center">
                                    <tr class="text-center edited-row">
                                        <th colspan="1">
                                            <div class="py-3">Order ID</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Date</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-2">Total</div>
                                        </th>
                                        {/* <th colspan="1"><div class="py-4 text-uppercase">Order Status</div></th> */}
                                        <th colspan="1">
                                            <div class="py-3">Status</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Actions</div>
                                        </th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr class="text-center">
                                            <th class="py-4 align-middle">152323234</th>
                                            <td class="py-4 align-middle">11/4/24</td>
                                            <td class="py-4 align-middle me-5">$123.23</td>
                                            <td class="py-4 align-middle">
                                                <span class="p-2 text-uppercase badge bg-mint">being made</span>
                                                
                                            </td>
                                            <td class="py-4 align-middle">
                                                <Link class="btn btn-outline-0 btn-sm fw-bold" onClick={() => toggleEditModal()}>
                                                    <span class="me-2">Edit Status</span> 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-pencil-square fs-4" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                    </svg>
                                                </Link>
                                            </td>
                                            
                                        </tr>
                                        <tr class="text-center">
                                            <th class="py-4 align-middle">23423434
                                                {/* <div class="form-outline" data-mdb-input-init="" data-mdb-input-initialized="true">
                                                    <input disabled="" type="text" class="form-control placeholder-active active" value="Smith &amp; Johnson"></input>
                                                    <div class="form-notch">
                                                        <div class="form-notch-leading" style={{width: "9px"}}></div>
                                                        <div class="form-notch-middle" style={{width: "0px"}}></div>
                                                        <div class="form-notch-trailing"></div>
                                                    </div>
                                                </div> */}
                                            </th>
                                            <td class="py-4 align-middle">10/31/24</td>
                                            <td class="py-4 align-middle">$45.67</td>
                                            <td class="py-4 align-middle">
                                                <span class="p-2 text-uppercase badge bg-mint">completed</span>
                                            </td>
                                            <td class="py-4 align-middle">
                                                <Link class="btn btn-outline-0 btn-sm fw-bold" onClick={() => toggleEditModal()}>
                                                    <span class="me-2">Edit Status</span> 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-pencil-square fs-4" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
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
        
        {editModal && (
            <div>
                <div class="fade modal-backdrop show"></div>
                <div role="dialog" aria-modal="true" class="fade modal show" tabindex="-1" style={{paddingLeft: "0px", display: "block"}}>
                    <div class="modal-dialog modal-md modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-content-dialog">
                                <div class="modal-content-content">
                                    <div class="p-5 modal-body">
                                        <div class="position-absolute top-0 end-0 me-3 mt-3">
                                            <button type="button" class="btn-close btn-close-primary close-modal" onClick={toggleEditModal}></button>
                                        </div>
                                        <form class="row">
                                            <h3 class="text-center mb-4">New Status</h3>
                                                <input type="input" class="form-control" id="inputStatus" placeholder="e.g. Completed"></input>
                                                <button type="submit" class="btn btn-green mt-4">Submit Change</button>
                                            <div class="col-auto">
                                                
                                            </div>
                                            <div class="col-auto">
                                                
                                            </div>
                                        </form>
                                            {/* <div class="col-lg-6">
                                                <img src="/Assets/apples.jpeg" class="img-fluid" alt="Apple"></img>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="ps-lg-8 mt-6 mt-lg-0">
                                                    <h2 class="mb-4 h1">Apple</h2>
                                                    <h2 class="my-6 mt-4"><span class="fs-4 text-dark">$1.50 per unit</span></h2>
                                                    <div class="fs-5 text-dark mt-2">1.00 ounce per unit</div>
                                                </div>
                                            </div> */}
                                        
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