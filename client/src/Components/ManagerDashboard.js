import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function ManagerDashboard() {
    const [editStatusModal, setEditStatusModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [reOrderProductsModal, setReOrderProductsModal] = useState(false);
    const [createProductModal, setCreateProductModal] = useState(false);
    const [editProductModal, setEditProductModal] = useState(false);

    const backgroundStyle = {
        backgroundImage: `url("/Assets/assortedVegetablesForLogin.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    const backgroundOpacity = {
        opacity: "0.5"
    };

    // const editStatus = async () => {
    //     try {
    //         // sidebar.classList.remove("show"); // Hides the sidebar
    //     } 
    //     catch (err) {
    //     }
    // }

    // Toggle modal 
    const toggleEditStatusModal = () => {
        setEditStatusModal(!editStatusModal); // Toggle modal open or closed
    };

    // Toggle modal
    const toggleAddModal = () => {
        setAddModal(!addModal); // Toggle modal open or closed
    };

    // Toggle modal
    const toggleReOrderProductsModal = () => {
        setReOrderProductsModal(!reOrderProductsModal); // Toggle modal open or closed
    };

     // Toggle modal
     const toggleCreateProductModal = () => {
        setCreateProductModal(!createProductModal); // Toggle modal open or closed
    };

    const toggleEditProductModal = () => {
        setEditProductModal(!editProductModal); // Toggle modal open or closed
    };

    // const editProductElements = document.getElementsByClassName("editProduct-manager");

    // const clearAll = () => {   
    //     Array.prototype.forEach.call(editProductElements.children, child => {
    //          console.log(child.value);
    //         child.value = "";
    //          console.log(child.value);
    //     })
    // }

    // const theClearAllButton = document.getElementById("clearAllButton");
    // theClearAllButton?.addEventListener('click', e => {
    //     // Loop & manipulate live nodeLList
    //     for (const field of document.getElementsByClassName('editProduct-manager')) {
    //         console.log(field.value);
    //         field.value = "";
    //         console.log(field.value);
    //     }
    //   });

    return(
    <>
        <div class="container">
            <div class="mb-5 row">
                <div class="col-md-12">
                    <div class="border-0 rounded-4 card bg-image mt-5" style={backgroundStyle}>
                        <div class="mask text-light d-flex justify-content-center flex-column text-center rounded-4 p-4" style={{backgroundColor: "rgba(52, 58, 64, 0.5)"}}>
                            <div class="p-lg-12 card-body">
                                <h1 class="text-white fw-bold">Welcome Back!</h1>
                                {/* <button type="button" class="btn btn-green p-2 me-3 mb-3">Create Product</button>
                                <button type="button" class="btn btn-green p-2 me-3 mb-3">Create Supplier Order</button>
                                <button type="button" class="btn btn-green p-2 me-3 mb-3">Add Employee Account</button>
                                <button type="button" class="btn btn-green p-2 me-3 mb-3">Add Supplier Account</button> */}
                                <div class="btn-toolbar justify-content-center" role="toolbar">
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn btn-green p-2 mb-3" onClick={() => toggleCreateProductModal()}>Create Product</button> 
                                    </div>
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn btn-green p-2 mb-3" href="#productsTable-manager">Edit Product</button> 
                                    </div>
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn btn-green p-2 mb-3" onClick={() => toggleReOrderProductsModal()}>Create Supplier Order</button>                                        
                                    </div>
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn btn-green p-2 mb-3" onClick={() => toggleAddModal()}>Add Employee Account</button>
                                    </div>
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn btn-green p-2 mb-3" onClick={() => toggleAddModal()}>Add Supplier Account</button>
                                    </div>
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn btn-green p-2 mb-3">Delivery Fleet Management</button>
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
                                                <span class="p-2 text-uppercase badge bg-mint">Ongoing</span>
                                                
                                            </td>
                                            <td class="py-4 align-middle">
                                                <Link class="btn btn-outline-0 btn-sm fw-bold" onClick={() => toggleEditStatusModal()}>
                                                    <span class="me-2">Edit Status</span> 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-pencil-square fs-4 " viewBox="0 0 16 16">
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
                                                <Link class="btn btn-outline-0 btn-sm fw-bold" onClick={() => toggleEditStatusModal()}>
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

            <div class="row">
                <div class="mb-5 col-xl-12 col-lg-12 col-md-12 col-12">
                    <div class="h-100 card-lg card">
                        <h3 class="p-4 my-2 fs-5 text-center" id="productsTable-manager">Products</h3>
                        <div class="p-0 card-body">
                            <div class="table-responsive">
                                <table class="table-centered text-nowrap table table-borderless table-hover">
                                <thead class="table-light text-center">
                                    <tr class="text-center">
                                        <th colspan="1">
                                            <div class="py-3">Image</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Name</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Category</div>
                                        </th>
                                        {/* <th colspan="1"><div class="py-4 text-uppercase">Order Status</div></th> */}
                                        <th colspan="1">
                                            <div class="py-3">Price per Unit</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Weight Per Unit</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Brand</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Description</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3">Stock</div>
                                        </th>
                                        <th colspan="1">
                                            <div class="py-3"></div>
                                        </th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr class="text-center">
                                            <th class="align-middle border-top-0 text-center py-4">
                                                <img
                                                src="/Assets/apples.jpeg"
                                                
                                                class="img-fluid"
                                                style={{
                                                    width: "120px",
                                                    height: "auto",
                                                    marginRight: "10px",
                                                }}
                                                ></img>
                                            </th>
                                            <td class="py-4 align-middle">Apples</td>
                                            <td class="py-4 align-middle me-5">Fruits</td>
                                            <td class="py-4 align-middle me-5">$1.25</td>
                                            <td class="py-4 align-middle me-5">$1.25</td>
                                            <td class="py-4 align-middle me-5">Sweet Orchard</td>
                                            <td class="py-4 align-middle me-5">
                                                <small class="product-description-manager">
                                                This apple is very tasty.<br></br>It is also very sweet.
                                                <br></br>This apple is very tasty.<br></br>It is also very sweet.
                                                <br></br>This apple is very tasty.<br></br>It is also very sweet.
                                                <br></br>This apple is very tasty.<br></br>It is also very sweet.
                                                </small>
                                            </td>
                                            <td class="py-4 align-middle me-5 fw-bold">In Stock</td>
                                            <td class="py-4 align-middle">
                                                <Link class="btn btn-outline-0 btn-sm fw-bold" onClick={() => toggleEditProductModal()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-pencil-square fs-5 text-secondary" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                    </svg>
                                                </Link>
                                                <Link class="btn btn-outline-0 btn-sm fw-bold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-trash3 fs-5 text-danger" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                                    </svg>
                                               </Link>
                                            
                                            </td>
                                            
                                        </tr>
                                        <tr class="text-center">
                                            <th class="align-middle border-top-0 text-center py-4">
                                                <img
                                                src="/Assets/broccoli.jpeg"
                                                
                                                class="img-fluid"
                                                style={{
                                                    width: "120px",
                                                    height: "auto",
                                                    marginRight: "10px",
                                                }}
                                                ></img>
                                            </th>
                                            <td class="py-4 align-middle">Broccoli</td>
                                            <td class="py-4 align-middle me-5">Vegetables</td>
                                            <td class="py-4 align-middle me-5">$1.25</td>
                                            <td class="py-4 align-middle me-5">$1.25</td>
                                            <td class="py-4 align-middle me-5">Sweet Orchard</td>
                                            <td class="py-4 align-middle me-5">
                                                <small class="product-description-manager">
                                                This broccoli is very crunchy.<br></br>It is also a bit sweet.
                                               
                                                </small>
                                            </td>
                                            <td class="py-4 align-middle me-5 fw-bold">In Stock</td>
                                            <td class="py-4 align-middle">
                                                <Link class="btn btn-outline-0 btn-sm fw-bold" onClick={() => toggleEditProductModal()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-pencil-square fs-5 text-secondary" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                    </svg>
                                                </Link>
                                                <Link class="btn btn-outline-0 btn-sm fw-bold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-trash3 fs-5 text-danger" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
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
        
        {editStatusModal && ( // MAKE DROPDOWN
            <div>
                <div class="fade modal-backdrop show"></div>
                <div role="dialog" aria-modal="true" class="fade modal show" tabindex="-1" style={{paddingLeft: "0px", display: "block"}}>
                    <div class="modal-dialog modal-md modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-content-dialog">
                                <div class="modal-content-content">
                                    <div class="p-5 modal-body">
                                        <div class="position-absolute top-0 end-0 me-3 mt-3">
                                            <button type="button" class="btn-close btn-close-primary close-modal" onClick={toggleEditStatusModal}></button>
                                        </div>
                                        <form class="row">
                                            <h3 class="text-center mb-4">New Status</h3>
                                            {/* <input type="input" class="form-control" id="inputStatus" placeholder="e.g. Completed"></input>  */}
                                            <div class="form-floating">
                                                <select class="form-select" id="changeStatusOptions">
                                                    <option selected>Choose a new status</option>
                                                    <option value="">Not Started</option>
                                                    <option value="">Ongoing</option>
                                                    <option value="">Completed</option>
                                                </select>
                                                <label for="changeStatusOptions">Status</label>
                                            </div>
                                            
                                            <button type="submit" class="btn btn-green mt-4">Submit Change</button>

                                            
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

        {addModal && (
            <div>
                <div class="fade modal-backdrop show"></div>
                <div role="dialog" aria-modal="true" class="fade modal show" tabindex="-1" style={{paddingLeft: "0px", display: "block"}}>
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-content-dialog">
                                <div class="modal-content-content">
                                    <div class="p-5 modal-body bg-green rounded-3">
                                        <div class="position-absolute top-0 end-0 me-3 mt-3">
                                            <button type="button" class="btn-close btn-close-primary close-modal" onClick={toggleAddModal}></button>
                                        </div>
                                        <div class="card-lg card border-0">
                                            
                                            <div class="p-5 card-body">
                                                <h3 class="text-center mb-4">Add Account</h3>

                                                <form>
                                                    <div class="mb-3">
                                                        <label for="sendToName" class="form-label">Name</label>
                                                        <input type="" class="form-control" id="sendToName" placeholder="Jane Doe"></input>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="sendToEmail" class="form-label">Email address</label>
                                                        <input type="email" class="form-control" id="sendToEmail" placeholder="name@example.com"></input>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="messageTextArea" class="form-label">Message</label>
                                                    <textarea class="form-control" id="messageTextArea" rows="3"></textarea>
                                                    </div>
                                                </form>
                                                <button type="submit" class="btn btn-lightergreen mt-3 w-100">Submit</button>
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

        {reOrderProductsModal && (
            <div>
                <div class="fade modal-backdrop show"></div>
                <div role="dialog" aria-modal="true" class="fade modal show" tabindex="-1" style={{paddingLeft: "0px", display: "block"}}>
                    <div class="modal-dialog modal-md modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-content-dialog">
                                <div class="modal-content-content">
                                    <div class="p-5 modal-body rounded-3">
                                        <div class="position-absolute top-0 end-0 me-3 mt-3">
                                            <button type="button" class="btn-close btn-close-primary close-modal" onClick={toggleReOrderProductsModal}></button>
                                        </div>
                                        <div class="card-md card border-0">
                                            
                                            <div class="card-body">
                                                <form class="row gy-2 gx-3 align-items-center">

                                                    <h3 class="text-center mb-4">Reorder Products</h3>
                                                    
                                                    <div class="col-lg-6">
                                                        <div class="form-floating">
                                                            <select class="form-select" id="selectSupplier">
                                                                <option selected>Choose a supplier</option>
                                                                <option value="">Supplier 1</option>
                                                                <option value="">Supplier 2</option>
                                                                <option value="">Supplier 3</option>
                                                            </select>
                                                            <label for="selectSupplier">Supplier</label>
                                                        </div>

                                                    </div>
                                                    
                                                    <div class="col-lg-6">
                                                        <div class="dropdown">
                                                            <button class="btn btn-products-dropdown btn-outline-none dropdown-toggle w-100 py-3 text-black" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Products
                                                            </button>
                                                            <ul class="dropdown-menu w-100">
                                                                <li> 
                                                                    <input class="form-check-input me-1 ms-4" type="checkbox" value="" id=""></input>
                                                                    <label class="form-check-label ms-2" for="">Apples</label>
                                                                </li>
                                                                <li>
                                                                    <input class="form-check-input me-1 ms-4" type="checkbox" value="" id=""></input>
                                                                    <label class="form-check-label ms-2" for="">Milk</label>
                                                                </li>
                                                                <li>
                                                                    <input class="form-check-input me-1 ms-4" type="checkbox" value="" id=""></input>
                                                                    <label class="form-check-label ms-2" for="">Bananas</label>
                                                                </li>
                                                            </ul>
                                                            

                                                            
                                                        </div>
                                                        {/* <div class="form-floating">
                                                        <select class="form-control selectpicker" multiple>
                                                            <option selected>Choose a supplier</option>
                                                            <option value="">Supplier 1</option>
                                                            <option value="">Supplier 2</option>
                                                            <option value="">Supplier 3</option>
                                                        </select>
                                                            <div>
                                                                <div class="form-check border-2 bg-danger p-3 text-end">
                                                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                        Default checkbox
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>

                                                
                                                    <button type="submit" class="btn btn-lightergreen mt-4">Place Order</button>
                                                </form>
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

        {createProductModal && (
            <div>
                <div class="fade modal-backdrop show"></div>
                <div role="dialog" aria-modal="true" class="fade modal show" tabindex="-1" style={{paddingLeft: "0px", display: "block"}}>
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-content-dialog">
                                <div class="modal-content-content">
                                    <div class="p-5 modal-body bg-green rounded-3">
                                        <div class="position-absolute top-0 end-0 me-3 mt-3">
                                            <button type="button" class="btn-close btn-close-primary close-modal" onClick={toggleCreateProductModal}></button>
                                        </div>
                                        

                                        <div class="card-lg card border-0">
                                            
                                            <div class="p-5 card-body">
                                            <h3 class="text-center mb-4">Create Product</h3>
                                                <form class="row">
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Product Name</label>
                                                        <input type="" class="form-control" placeholder="e.g. Apples"></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                    <label for="sendToName" class="form-label">Product Category</label>
                                                        <select class="form-select">
                                                            <option selected>Select a category</option>
                                                            <option value="">Fruits</option>
                                                            <option value="">Vegetables</option>
                                                            <option value="">Meats</option>
                                                            <option value="">Dairy</option>
                                                            <option value="">Snacks</option>
                                                            <option value="">Meals</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Product Description</label>
                                                        <input type="text" class="form-control" placeholder="e.g. These apples are juicy and shiny."></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Price per Unit</label>
                                                        <input type="number" min="0.01" step="0.01" class="form-control" placeholder="e.g. 1.25"></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Weight per Unit</label>
                                                        <input type="number" min="0.01" step="0.01" class="form-control" placeholder="e.g. 4.15"></input>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Product Image</label>
                                                        <input class="form-control" type="file" id="formFile"></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Brand</label>
                                                        <input type="text" class="form-control" placeholder="e.g. Sunny Orchard"></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Reorder Quantity</label>
                                                        <input type="number" min="1" step="1" class="form-control" placeholder="e.g. 25"></input>
                                                    </div>
                                                    
                                                </form>
                                               
                                                <button type="submit" class="btn btn-lightergreen mt-3 w-100">Create New Product</button>
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

    {editProductModal && (
            <div>
                <div class="fade modal-backdrop show"></div>
                <div role="dialog" aria-modal="true" class="fade modal show" tabindex="-1" style={{paddingLeft: "0px", display: "block"}}>
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-content-dialog">
                                <div class="modal-content-content">
                                    <div class="p-5 modal-body bg-green rounded-3">
                                        <div class="position-absolute top-0 end-0 me-3 mt-3">
                                            <button type="button" class="btn-close btn-close-primary close-modal" onClick={toggleEditProductModal}></button>
                                        </div>
                                        

                                        <div class="card-lg card border-0">
                                            
                                            <div class="p-5 card-body">
                                            <h3 class="text-center mb-4">Edit Product</h3>
                                                <form class="row">
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Product Name</label>
                                                        {/* defaultValue => this is what gives the field its initial value of, for example, Apples */}
                                                        <input type="text" class="form-control editProduct-manager" placeholder="e.g. Apples" defaultValue="Apples"></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                    <label for="sendToName" class="form-label">Product Category</label>
                                                        <select class="form-select">
                                                            <option selected>Select a category</option>
                                                            <option value="">Fruits</option>
                                                            <option value="">Vegetables</option>
                                                            <option value="">Meats</option>
                                                            <option value="">Dairy</option>
                                                            <option value="">Snacks</option>
                                                            <option value="">Meals</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Product Description</label>
                                                        <input type="text" class="form-control editProduct-manager" placeholder="e.g. These apples are juicy and shiny." defaultValue="These apples are juicy and shiny."></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Price per Unit</label>
                                                        <input type="number" min="0.01" step="0.01" class="form-control editProduct-manager" placeholder="e.g. 1.25" defaultValue="1.25"></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Weight per Unit</label>
                                                        <input type="number" min="0.01" step="0.01" class="form-control editProduct-manager" placeholder="e.g. 4.15" defaultValue="1.25"></input>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Product Image</label>
                                                        <input class="form-control" type="file" id="formFile"></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Brand</label>
                                                        <input type="text" class="form-control editProduct-manager" placeholder="e.g. Sunny Orchard" defaultValue="Sweet Orchard"></input>
                                                    </div>
                                                    <div class="mb-3 col-lg-6">
                                                        <label class="form-label">Reorder Quantity</label>
                                                        <input type="number" min="1" step="1" class="form-control editProduct-manager" placeholder="e.g. 25" defaultValue="25"></input>
                                                    </div>
                                                    
                                                </form>
                                                <button type="" class="btn btn-pastelblue mt-3 w-100" id="clearAllButton">Clear All Fields</button>
                                                <button type="submit" class="btn btn-lightergreen mt-4 w-100">Create New Product</button>
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