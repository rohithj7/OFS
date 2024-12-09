import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { validatePassword } from "./Signup";
import Tooltip from "./Tooltip"; // Add this line

function ManagerDashboard() {
  const [editStatusModal, setEditStatusModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [reOrderProductsModal, setReOrderProductsModal] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);
  const [accountType, setAccountType] = useState("employee"); // or 'supplier'
  const [accountFormData, setAccountFormData] = useState({
    email: "",
    password: "",
    supplierName: "",
    firstName: "",
    lastName: "",
    ssn: "",
    salary: "",
    startDate: "",
  });
  const [editProductData, setEditProductData] = useState(null);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [recentSales, setRecentSales] = useState([]);
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [orderData, setOrderData] = useState({
    supplierName: "",
    quantity: "",
  });
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [showConfirmPasswordTooltip, setShowConfirmPasswordTooltip] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [statistics, setStatistics] = useState({
    totalEarnings: 0,
    todayEarnings: 0,
    monthlyEarnings: 0,
    totalSales: 0,
    todayOrders: 0,
    monthlyOrders: 0,
    totalCustomers: 0,
    todayCustomers: 0,
    monthlyCustomers: 0,
  });
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showRecentSales, setShowRecentSales] = useState(false);

  const backgroundStyle = {
    backgroundImage: `url("https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/assortedVegetablesForLogin.jpeg?raw=true")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const backgroundOpacity = {
    opacity: "0.5",
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

  const toggleEditProductModal = (product = null) => {
    if (product) {
      setEditProductData(product);
    } else {
      setEditProductData(null);
    }
    setShowEditProductModal(!showEditProductModal);
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

  const [oneTimePassword, setOneTimePassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSSNTooltip, setShowSSNTooltip] = useState(false);
  const [ssnFocused, setSSNFocused] = useState(false);
  const [showSalaryTooltip, setShowSalaryTooltip] = useState(false);
  const [salaryFocused, setSalaryFocused] = useState(false);
  const [showStartDateTooltip, setShowStartDateTooltip] = useState(false);
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [showSupplierNameTooltip, setShowSupplierNameTooltip] = useState(false);
  const [supplierNameFocused, setSupplierNameFocused] = useState(false);
  const [showSSN, setShowSSN] = useState(false); // Add this state
  const [showPassword, setShowPassword] = useState(false); // Add this state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Add this state

  const validateSSN = (ssn) => {
    const regex = /^\d{3}-\d{2}-\d{4}$/;
    return regex.test(ssn);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateSalary = (salary) => {
    const regex = /^\d{1,6}(\.\d{1,2})?$/;
    return regex.test(salary) && parseFloat(salary) > 0;
  };

  const handleSalaryChange = (e) => {
    let value = e.target.value;
    const regex = /^\d{0,6}(\.\d{0,2})?$/;
    if (regex.test(value)) {
      // Trim leading zeroes
      value = value.replace(/^0+(?!\.|$)/, '');
      setAccountFormData({
        ...accountFormData,
        salary: value,
      });
    }
  };

  const validateStartDate = (date) => {
    const today = new Date();
    const startDate = new Date(date); // Ensure the date is in YYYY-MM-DD format
    const oneYearAhead = new Date(today);
    oneYearAhead.setFullYear(today.getFullYear() + 1);
    const fiveYearsPrior = new Date(today);
    fiveYearsPrior.setFullYear(today.getFullYear() - 5);
    return startDate >= fiveYearsPrior && startDate <= oneYearAhead;
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(accountFormData.email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!validateSalary(accountFormData.salary)) {
        alert("Salary must be a number with 2 to 6 digits before the decimal and up to 2 digits after the decimal.");
        return;
      }
      if (!validateStartDate(accountFormData.startDate)) {
        alert("Start date must be within the last 5 years and not more than 1 year ahead.");
        return;
      }
      const response = await axios.post(
        "/api/registerEmployee",
        {
          email: accountFormData.email,
          firstName: accountFormData.firstName,
          lastName: accountFormData.lastName,
          ssn: accountFormData.ssn,
          salary: parseFloat(accountFormData.salary),
          startDate: accountFormData.startDate,
          password: accountFormData.password,
        },
        { withCredentials: true }
      );
      // console.log("Registration response:", response.data);
      setOneTimePassword(response.data.oneTimePassword);
      setShowPasswordModal(true);
      alert("Employee added successfully!");
      toggleAddModal();
      setAccountFormData({
        email: "",
        supplierName: "",
        firstName: "",
        lastName: "",
        ssn: "",
        salary: "",
        startDate: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    }
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(accountFormData.email)) {
        alert("Please enter a valid email address.");
        return;
      }
      const res = await axios.post(
        "/api/registerSupplier",
        {
          email: accountFormData.email,
          supplierName: accountFormData.supplierName,
        },
        { withCredentials: true }
      );
      // console.log("Registration response:", res.data);
      setOneTimePassword(res.data.oneTimePassword);
      setShowPasswordModal(true);
      alert("Supplier added successfully!");
      toggleAddModal();
      setAccountFormData({
        email: "",
        supplierName: "",
        firstName: "",
        lastName: "",
        ssn: "",
        salary: "",
        startDate: "",
      });
    } catch (error) {
      console.error("Error adding supplier:", error);
      alert("Failed to add supplier. Please try again.");
    }
  };

  // Add handler function
  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(accountFormData.email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!validateSalary(accountFormData.salary)) {
        alert("Salary must be a number with 2 to 6 digits before the decimal and up to 2 digits after the decimal.");
        return;
      }
      if (!validateStartDate(accountFormData.startDate)) {
        alert("Start date must be within the last 5 years and not more than 1 year ahead.");
        return;
      }
      if (accountType === "supplier") {
        const res = await axios.post(
          "/api/registerSupplier",
          {
            email: accountFormData.email,
            supplierName: accountFormData.supplierName,
          },
          { withCredentials: true }
        );
        // console.log("Registration response:", res.data);
        setOneTimePassword(res.data.oneTimePassword);
        setShowPasswordModal(true);
        alert("Supplier added successfully!");
      } else {
        const response = await axios.post(
          "/api/registerEmployee",
          {
            email: accountFormData.email,
            firstName: accountFormData.firstName,
            lastName: accountFormData.lastName, // Ensure last name is included
            ssn: accountFormData.ssn,
            salary: parseFloat(accountFormData.salary),
            startDate: accountFormData.startDate,
            password: accountFormData.password, // Ensure password is included
          },
          { withCredentials: true }
        );
        // console.log("Registration response:", response.data);
        setOneTimePassword(response.data.oneTimePassword);
        setShowPasswordModal(true);
        alert("Employee added successfully!");
      }

      toggleAddModal();
      setAccountFormData({
        email: "",
        supplierName: "",
        firstName: "",
        lastName: "",
        ssn: "",
        salary: "",
        startDate: "",
      });
    } catch (error) {
      console.error("Error adding account:", error);
      alert("Failed to add account. Please try again.");
    }
  };

  // Add this function to handle employee button click
  const handleAddEmployeeClick = () => {
    setAccountType("employee");
    toggleAddModal();
  };

  // Add this function to handle supplier button click
  const handleAddSupplierClick = () => {
    setAccountType("supplier");
    toggleAddModal();
  };

  // Add this handler function
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    // Log the form values first
    // console.log("Form Values:", {
    //   categoryId: e.target.categoryId.value,
    //   productName: e.target.productName.value,
    //   productDescription: e.target.productDescription.value,
    //   brand: e.target.brand.value,
    //   pictureUrl: e.target.pictureUrl.value,
    //   quantity: e.target.quantity.value,
    //   reorderLevel: e.target.reorderLevel.value,
    //   // reorderQuantity: e.target.reorderQuantity.value,
    //   price: e.target.price.value,
    //   weight: e.target.weight.value,
    // });

    const productData = {
      categoryId: Number(e.target.categoryId.value), // Changed to Number()
      productName: e.target.productName.value.trim(),
      productDescription: e.target.productDescription.value.trim(),
      brand: e.target.brand.value.trim(),
      pictureUrl: e.target.pictureUrl.value.trim(),
      quantity: Number(e.target.quantity.value),
      reorderLevel: Number(e.target.reorderLevel.value),
      //reorderQuantity: Number(e.target.reorderQuantity.value),
      price: Number(e.target.price.value),
      weight: Number(e.target.weight.value),
    };

    // Log the formatted data
    // console.log("Formatted Product Data:", productData);

    try {
      // Log the request
      // console.log("Sending request to:", "http://localhost:8080/products");

      const response = await axios.post(
        "/api/products",
        productData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the response
      // console.log("Server Response:", response);

      if (response.status === 201) {
        toggleCreateProductModal();
        alert("Product created successfully!");
        e.target.reset();
      }
    } catch (error) {
      // Enhanced error logging
      console.error("Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      alert(
        `Failed to create product: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const [products, setProducts] = useState([]);

  // Add these state variables at the top
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Add categories array with an initial prompt
  const categories = [
    { id: "", name: "Select a category" }, // Add initial prompt
    { id: "all", name: "All Products" },
    { id: "1", name: "Fruits" },
    { id: "2", name: "Vegetables" },
    { id: "3", name: "Meats" },
    { id: "4", name: "Dairy" },
    { id: "5", name: "Snacks" },
    { id: "6", name: "Meals" },
  ];

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  // Update the fetch useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/products", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update the filtering useEffect to be more efficient
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts([]);
    } else if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) => product?.CATEGORYID?.toString() === selectedCategory
        )
      );
    }
  }, [selectedCategory, products]);

  // Update the handleDeleteProduct function to use axios
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // console.log("Attempting to delete product:", productId);

        if (!productId) {
          throw new Error("Invalid product ID");
        }

        const response = await axios.delete(
          `/api/products/${productId}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.ID !== productId)
          );
          setFilteredProducts((prevFiltered) =>
            prevFiltered.filter((product) => product.ID !== productId)
          );
          alert("Product deleted successfully");
        }
      } catch (error) {
        console.error("Delete product error:", {
          status: error.response?.status,
          message: error.response?.data || error.message,
        });

        // Provide a user-friendly message for the foreign key constraint error
        if (error.response?.data?.includes("foreign key constraint fails")) {
          alert(
            "This product cannot be deleted because it has existing sales records. " +
              "To maintain accurate sales history, products with sales records must be kept in the system."
          );
        } else if (error.response?.status === 404) {
          alert("Product not found.");
        } else {
          alert(
            "Failed to delete product. Please contact system administrator for assistance."
          );
        }
      }
    }
  };

  // Add the edit handler function
  const handleEditClick = (product) => {
    setEditingProduct({ ...product }); // Create a copy of the product
    setShowEditProductModal(true);
  };

  // Update the save handler function
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      // Format the data to match backend expectations
      const formData = {
        categoryId: Number(editingProduct.CATEGORYID),
        productName: editingProduct.PRODUCTNAME,
        productDescription: editingProduct.PRODUCTDESCRIPTION,
        brand: editingProduct.BRAND,
        pictureUrl: editingProduct.PICTURE_URL,
        quantity: Number(editingProduct.QUANTITY),
        reorderLevel: Number(editingProduct.REORDERLEVEL),
        reorderQuantity: Number(editingProduct.REORDERQUANTITY),
        price: Number(editingProduct.PRICE),
        weight: Number(editingProduct.WEIGHT),
      };

      // console.log("Sending update with data:", formData); // Debug log

      const response = await axios.put(
        `/api/products/${editingProduct.ID}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        // Update local state
        setProducts(
          products.map((product) =>
            product.ID === editingProduct.ID
              ? { ...product, ...editingProduct }
              : product
          )
        );
        setShowEditProductModal(false);
        setEditingProduct(null);
        alert("Product updated successfully");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      console.error("Error details:", error.response?.data); // Debug log
      alert(
        `Failed to update product: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  useEffect(() => {
    const fetchAllSales = async () => {
      try {
        const response = await axios.get("/api/all_sales", {
          withCredentials: true,
        });
        // Sort all sale orders by date (most recent first)
        const allSales = response.data.sort(
          (a, b) => new Date(b.SALEDATE) - new Date(a.SALEDATE)
        );
        setRecentSales(allSales);
      } catch (error) {
        console.error("Error fetching sale orders:", error);
      }
    };

    fetchAllSales();
  }, []);

  const handleStatusUpdate = async (saleId, newStatus) => {
    try {
      const response = await axios.put(
        `/api/sales/${saleId}/status`,
        { newStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setRecentSales((prevSales) =>
          prevSales.map((sale) =>
            sale.ID === saleId ? { ...sale, SALE_STATUS: newStatus } : sale
          )
        );
        alert("Sale order status updated successfully");
        toggleEditStatusModal();
      }
    } catch (error) {
      console.error("Error updating sale order status:", error);
      alert("Failed to update sale order status");
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("/api/suppliers", {
          withCredentials: true,
        });
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setOrderData({
      supplierName: "",
      quantity: product.REORDERQUANTITY,
    });
    setShowOrderModal(true);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/admin/reorder-product",
        {
          productName: selectedProduct.PRODUCTNAME,
          supplierName: orderData.supplierName,
          quantity: parseInt(orderData.quantity),
        },
        { withCredentials: true }
      );

      alert("Order placed successfully!");
      setShowOrderModal(false);
      setSelectedProduct(null);
      setOrderData({ supplierName: "", quantity: "" });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const toggleResetPasswordModal = () => {
    setShowResetPasswordModal(!showResetPasswordModal);
    setNewPassword("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const passwordErrors = validatePassword(newPassword);
    const passwordError = passwordErrors.find((error) => !error.valid);
    if (passwordError) {
      alert(passwordError.text);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "/api/admin/reset-password",
        { newPassword },
        { withCredentials: true }
      );

      alert("Password reset successfully!");
      toggleResetPasswordModal();
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again.");
    }
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("/api/statistics", {
          withCredentials: true,
        });
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  // Add this function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/all-orders", {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Add this useEffect to fetch orders when showOrders changes
  useEffect(() => {
    if (showOrders) {
      fetchOrders();
    }
  }, [showOrders]);

  const renderOrdersTable = () => {
    return (
      <div className="table-responsive mt-3 mx-3">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                // Convert prices to numbers and handle undefined values
                const productPrice = Number(order.productPrice) || 0;
                const totalPrice = Number(order.totalPrice) || 0;

                return (
                  <tr key={`${order.orderId}-${order.PRODUCTNAME}`}>
                    <td>{order.orderId}</td>
                    <td>{order.SUPPLIERNAME}</td>
                    <td>
                      {order.PRODUCTNAME} ({order.BRAND})
                    </td>
                    <td>{order.QUANTITY}</td>

                    <td>${totalPrice.toFixed(2)}</td>
                    <td>{new Date(order.ORDERDATE).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          order.ORDER_STATUS === "COMPLETED"
                            ? "success"
                            : order.ORDER_STATUS === "ONGOING"
                            ? "warning"
                            : "secondary"
                        }`}
                      >
                        {order.ORDER_STATUS}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };

  const passwordErrors = validatePassword(newPassword);
  const passwordError = passwordErrors.find((error) => !error.valid);
  const passwordsMatch = newPassword === confirmNewPassword;
  const isPasswordValid = passwordErrors.every((error) => error.valid);

  const handleSSNChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length > 9) {
      value = value.slice(0, 9); // Limit to 9 digits
    }
    if (value.length > 3 && value.length <= 5) {
      value = value.replace(/(\d{3})(\d+)/, "$1-$2");
    } else if (value.length > 5) {
      value = value.replace(/(\d{3})(\d{2})(\d+)/, "$1-$2-$3");
    }
    setAccountFormData({
      ...accountFormData,
      ssn: value,
    });
  };

  const handleEmailFocus = () => {
    setShowEmailTooltip(true);
  };

  const handleEmailBlur = () => {
    setShowEmailTooltip(false);
  };

  const isEmployeeFormValid = () => {
    return (
      validateEmail(accountFormData.email) &&
      accountFormData.firstName &&
      accountFormData.lastName &&
      validateSSN(accountFormData.ssn) &&
      validateSalary(accountFormData.salary) &&
      validateStartDate(accountFormData.startDate)
    );
  };

  const isSupplierFormValid = () => {
    return (
      validateEmail(accountFormData.email) &&
      accountFormData.supplierName
    );
  };

  return (
    <div className="container mt-4">
      {/* Welcome Banner */}
      <div className="mb-5 row">
        <div className="col-md-12">
          <div
            className="border-0 rounded-4 card bg-image mt-5"
            style={backgroundStyle}
          >
            <div
              className="mask text-light d-flex justify-content-center flex-column text-center rounded-4 p-4"
              style={{ backgroundColor: "rgba(52, 58, 64, 0.5)" }}
            >
              <div className="p-lg-12 card-body">
                <h1 className="text-white fw-bold">Welcome Back!</h1>
                <div
                  className="btn-toolbar justify-content-center"
                  role="toolbar"
                >
                  <div className="btn-group me-2" role="group">
                    <button
                      type="button"
                      className="btn btn-green p-2 mb-3"
                      onClick={() => toggleCreateProductModal()}
                    >
                      Create Product
                    </button>
                  </div>

                  <div className="btn-group me-2" role="group">
                    <button
                      type="button"
                      className="btn btn-green p-2 mb-3"
                      onClick={handleAddEmployeeClick}
                    >
                      Add Employee Account
                    </button>
                  </div>
                  <div className="btn-group me-2" role="group">
                    <button
                      type="button"
                      className="btn btn-green p-2 mb-3"
                      onClick={handleAddSupplierClick}
                    >
                      Add Supplier Account
                    </button>
                  </div>
                  <div className="btn-group me-2" role="group">
                    <Link to="/ManagerDashboard/DeliveryManagement">
                      <button type="button" className="btn btn-green p-2 mb-3">
                        Delivery Fleet Management
                      </button>
                    </Link>
                  </div>
                  <div className="btn-group me-2" role="group">
                    <button
                      type="button"
                      className="btn btn-warning p-2 mb-3"
                      onClick={toggleResetPasswordModal}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="mb-5 row">
        <div className="table-responsive-xl mb-lg-0">
          <div className="flex-nowrap pb-3 pb-lg-0 row">
            <div className="mb-6 col-lg-4 col-12">
              <div className="h-100 card-lg card">
                <div className="p-6 card-body">
                  <div className="d-flex justify-content-between align-items-center mb-6">
                    <div>
                      <h4 className="mb-0 fs-5">Total Earnings</h4>
                    </div>
                    <div className="icon-shape icon-md p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="bi bi-currency-dollar fs-5"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                      </svg>
                    </div>
                  </div>
                  <div className="lh-1">
                    <h1 className="mb-2 fw-bold fs-2">
                      $
                      {(statistics?.totalEarnings || 0).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </h1>
                  </div>
                </div>
                <div className="card-footer bg-lightergreen border-0">
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      <p className="fs-6 text-muted mb-0">Today's earnings</p>
                      <p className="fs-5 fw-bold mb-0">
                        $
                        {(statistics?.todayEarnings || 0).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                    </div>
                    <div className="col text-end text-truncate">
                      <p className="fs-6 text-muted mb-0">Monthly earnings</p>
                      <p className="fs-5 fw-bold mb-0">
                        $
                        {(statistics?.monthlyEarnings || 0).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 col-lg-4 col-12">
              <div className="h-100 card-lg card">
                <div className="p-6 card-body">
                  <div className="d-flex justify-content-between align-items-center mb-6">
                    <div>
                      <h4 className="mb-0 fs-5">Total Sales</h4>
                    </div>
                    <div className="icon-shape icon-md p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="bi bi-cart2 fs-5"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                      </svg>
                    </div>
                  </div>
                  <div className="lh-1">
                    <h1 className="mb-2 fw-bold fs-2">
                      {statistics.totalSales.toLocaleString("en-US")}
                    </h1>
                  </div>
                </div>
                <div className="card-footer bg-lightergreen border-0">
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      <p className="fs-6 text-muted mb-0">Today's Orders</p>
                      <p className="fs-5 fw-bold mb-0">
                        {statistics.todayOrders.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="col text-end text-truncate">
                      <p className="fs-6 text-muted mb-0">Monthly Orders</p>
                      <p className="fs-5 fw-bold mb-0">
                        {statistics.monthlyOrders.toLocaleString("en-US")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 col-lg-4 col-12">
              <div className="h-100 card-lg card">
                <div className="p-6 card-body">
                  <div className="d-flex justify-content-between align-items-center mb-6">
                    <div>
                      <h4 className="mb-0 fs-5">Total Customers</h4>
                    </div>
                    <div className="icon-shape icon-md p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="bi bi-person fs-5"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                      </svg>
                    </div>
                  </div>
                  <div className="lh-1">
                    <h1 className="mb-2 fw-bold fs-2">
                      {statistics.totalCustomers.toLocaleString("en-US")}
                    </h1>
                  </div>
                </div>
                <div className="card-footer bg-lightergreen border-0">
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      <p className="fs-6 text-muted mb-0">Today's Customers</p>
                      <p className="fs-5 fw-bold mb-0">
                        {statistics.todayCustomers.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="col text-end text-truncate">
                      <p className="fs-6 text-muted mb-0">Monthly Customers</p>
                      <p className="fs-5 fw-bold mb-0">
                        {statistics.monthlyCustomers.toLocaleString("en-US")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Orders</h2>
        <button
          className="btn btn-green"
          onClick={() => setShowOrders(!showOrders)}
        >
          {showOrders ? "Hide Supplier Orders" : "Show Supplier Orders"}
        </button>
      </div>

      {showOrders && (
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="card-title mb-0 py-2">Supplier Orders</h3>
          </div>
          <div className="card-body">{renderOrdersTable()}</div>
        </div>
      )}

      {/* Recent Sales Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Sales</h2>
        <button
          className="btn btn-green"
          onClick={() => setShowRecentSales(!showRecentSales)}
        >
          {showRecentSales ? "Hide Sales" : "Show Sales"}
        </button>
      </div>

      {showRecentSales && (
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="card-title mb-0 py-2">Customer Orders</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive mt-3 mx-3">
              <table className="table-centered text-nowrap table table-borderless table-hover">
                <thead className="table-light text-center">
                  <tr>
                    <th>
                      <div className="py-3">Sale ID</div>
                    </th>
                    <th>
                      <div className="py-3">Customer ID</div>
                    </th>
                    <th>
                      <div className="py-3">Date</div>
                    </th>
                    <th>
                      <div className="py-3">Price ($)</div>
                    </th>
                    <th>
                      <div className="py-3">Status</div>
                    </th>
                    <th>
                      <div className="py-3">Actions</div>
                    </th>
                    {/* <th>
                      <div className="py-3">Delivery Fleet</div>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => (
                    <tr key={sale.ID} className="text-center">
                      <th className="py-4 align-middle">
                        <Link
                          to={`/saleDetails/${sale.ID}`}
                          state={{
                            orderDate: new Date(
                              sale.SALEDATE
                            ).toLocaleDateString(),
                            orderStatus: sale.SALE_STATUS,
                          }}
                          className="text-decoration-none text-primary"
                        >
                          {sale.ID}
                        </Link>
                      </th>
                      <td className="py-4 align-middle">{sale.CUSTOMERID}</td>
                      <td className="py-4 align-middle">
                        {new Date(sale.SALEDATE).toLocaleDateString()}
                      </td>
                      <td className="py-4 align-middle">
                        {Number(sale.PRICE).toFixed(2)}
                      </td>
                      <td className="py-4 align-middle">
                        <span
                          className={`p-2 text-uppercase badge ${
                            sale.SALE_STATUS === "COMPLETED"
                              ? "bg-success"
                              : sale.SALE_STATUS === "ONGOING"
                              ? "bg-mint"
                              : "bg-warning"
                          }`}
                        >
                          {sale.SALE_STATUS}
                        </span>
                      </td>
                      <td className="py-4 align-middle">
                        <button
                          className="btn btn-outline-0 btn-sm fw-bold hover-shadow"
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                          onClick={() => {
                            setSelectedSaleId(sale.ID);
                            toggleEditStatusModal();
                          }}
                        >
                          <span className="me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              class="bi bi-pencil-square fs-5 me-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                              />
                            </svg>
                            Edit Status
                          </span>
                        </button>
                      </td>
                      {/* <th>
                      <td className="py-4 align-middle text-center">
                        <Link
                          to={`/delivery-fleet/${sale.ID}`}
                          className="btn btn-green btn-sm d-inline-flex align-items-center justify-content-center"
                          style={{ minWidth: "120px" }}
                        >
                          <span>Track Delivery</span>
                        </Link>
                      </td>
                    </th> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
      </div>
      <div className="row">
        <div className="mb-5 col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="h-100 card-lg card">
            <div className="d-flex justify-content-between align-items-center p-4">
              <h3 className="fs-5 mb-0" id="productsTable-manager">
                Products
                {selectedCategory && (
                  <span className="text-muted ms-2">
                    ({filteredProducts.length}{" "}
                    {selectedCategory === "all" ? "total" : "items"})
                  </span>
                )}
              </h3>
              <div className="d-flex align-items-center">
                <select
                  className="form-select me-3"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={isLoading}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-0 card-body">
              {isLoading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : !selectedCategory ? (
                <div className="text-center p-4 text-muted">
                  Please select a category to view products
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  No products found in this category
                </div>
              ) : (
                <div className="table-responsive rounded-1">
                  <table className="table-centered text-nowrap table table-hover table-borderless mb-0">
                    <thead className="table-light text-center">
                      <tr className="text-center">
                        <th scope="col" className="text-center">
                          ID
                        </th>
                        <th scope="col" className="text-center">
                          Image
                        </th>
                        <th scope="col" className="text-center">
                          Name
                        </th>
                        <th scope="col" className="text-center">
                          Category
                        </th>
                        <th scope="col" className="text-center">
                          Price per Unit
                        </th>
                        <th scope="col" className="text-center">
                          Weight Per Unit
                        </th>
                        <th scope="col" className="text-center">
                          Brand
                        </th>
                        <th scope="col" className="text-center">
                          Description
                        </th>
                        <th scope="col" className="text-center">
                          Quantity
                        </th>
                        <th scope="col" className="text-center">
                          Recommended Reorder Level
                        </th>
                        <th scope="col" className="text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.ID}
                          className={`${
                            product.QUANTITY <= product.REORDERLEVEL
                              ? "table-danger"
                              : ""
                          }`}
                        >
                          <td className="text-center align-middle">
                            {product.ID}
                          </td>
                          <td className="text-center align-middle">
                            <img
                              src={`${product.PICTURE_URL}`}
                              alt={product.PRODUCTNAME}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td className="text-center align-middle">
                            {product.PRODUCTNAME}
                          </td>
                          <td className="text-center align-middle">
                            {product.CATEGORYID}
                          </td>
                          <td className="text-center align-middle">
                            ${product.PRICE}
                          </td>
                          <td className="text-center align-middle">
                            {product.WEIGHT} oz
                          </td>
                          <td className="text-center align-middle">
                            {product.BRAND}
                          </td>
                          <td className="text-center align-middle">
                            {product.PRODUCTDESCRIPTION}
                          </td>
                          <td className="text-center align-middle">
                            {product.QUANTITY}
                          </td>
                          <td className="text-center align-middle">
                            {product.REORDERLEVEL}
                          </td>
                          <td className="text-center align-middle">
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => handleEditClick(product)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                class="bi bi-pencil-square fs-5 me-1"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                />
                              </svg>
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm me-2"
                              onClick={() => handleDeleteProduct(product.ID)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                class="bi bi-trash3 fs-5 me-1"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                              </svg>
                              Delete
                            </button>
                            <button
                              className="btn btn-outline-darkergreen btn-sm orderProductButton"
                              onClick={() => handleOrderClick(product)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                class="bi bi-box-seam fs-5 me-1"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                              </svg>
                              Order Product
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {editStatusModal && (
        <div>
          <div className="fade modal-backdrop show"></div>
          <div
            role="dialog"
            aria-modal="true"
            className="fade modal show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Sale Status</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleEditStatusModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <select
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="">Select new status</option>
                    <option value="NOT STARTED">Not Started</option>
                    <option value="STARTED">Started</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-mint"
                    onClick={toggleEditStatusModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-green"
                    onClick={() =>
                      handleStatusUpdate(selectedSaleId, newStatus)
                    }
                    disabled={!newStatus}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {addModal && (
        <div>
          <div class="fade modal-backdrop show"></div>
          <div
            role="dialog"
            aria-modal="true"
            class="fade modal show"
            tabindex="-1"
            style={{ paddingLeft: "0px", display: "block" }}
          >
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-content-dialog">
                  <div class="modal-content-content">
                    <div class="p-5 modal-body bg-green rounded-3">
                      <div class="position-absolute top-0 end-0 me-3 mt-3">
                        <button
                          type="button"
                          class="btn-close btn-close-primary close-modal"
                          onClick={toggleAddModal}
                        ></button>
                      </div>
                      <div class="card-lg card border-0">
                        <div class="p-5 card-body">
                          <h3 class="text-center mb-4">
                            Add{" "}
                            {accountType === "supplier"
                              ? "Supplier"
                              : "Employee"}{" "}
                            Account
                          </h3>

                          {/* Account Type Selector */}
                          <div class="mb-3">
                            <select
                              class="form-select"
                              value={accountType}
                              onChange={(e) => setAccountType(e.target.value)}
                            >
                              <option value="employee">Employee Account</option>
                              <option value="supplier">Supplier Account</option>
                            </select>
                          </div>

                          <form onSubmit={accountType === "supplier" ? handleAddSupplier : handleAddEmployee}>
                            {accountType === "supplier" ? (
                              // Supplier Form
                              <>
                                <div class="mb-3 position-relative">
                                  <label class="form-label">
                                    Email address <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    class={`form-control ${!validateEmail(accountFormData.email) && showEmailTooltip ? "invalid-background" : ""}`}
                                    placeholder="supplier@example.com"
                                    value={accountFormData.email}
                                    onChange={(e) =>
                                      setAccountFormData({
                                        ...accountFormData,
                                        email: e.target.value,
                                      })
                                    }
                                    onFocus={handleEmailFocus}
                                    onBlur={handleEmailBlur}
                                  />
                                  <Tooltip
                                    messages={[
                                      { text: "Please enter a valid email address.", valid: validateEmail(accountFormData.email) },
                                    ]}
                                    visible={showEmailTooltip}
                                  />
                                </div>

                                <div class="mb-3 position-relative">
                                  <label class="form-label">
                                    Supplier Name <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter supplier name"
                                    value={accountFormData.supplierName}
                                    onChange={(e) =>
                                      setAccountFormData({
                                        ...accountFormData,
                                        supplierName: e.target.value,
                                      })
                                    }
                                    onFocus={() => {
                                      setSupplierNameFocused(true);
                                    }}
                                    onBlur={() => {
                                      setSupplierNameFocused(false);
                                    }}
                                  />
                                  <Tooltip
                                    messages={[
                                      { text: "Supplier name is required.", valid: accountFormData.supplierName.length > 0 },
                                    ]}
                                    visible={supplierNameFocused && accountFormData.supplierName.length > 0}
                                  />
                                </div>
                              </>
                            ) : (
                              // Employee Form
                              <>
                              <div class="mb-3">
                                  <label class="form-label">
                                    Email address <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    class="form-control"
                                    placeholder="employee@example.com"
                                    value={accountFormData.email}
                                    onChange={(e) =>
                                      setAccountFormData({
                                        ...accountFormData,
                                        email: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>

                                <div class="mb-3">
                                  <label class="form-label">
                                    First Name <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter first name"
                                    value={accountFormData.firstName}
                                    onChange={(e) =>
                                      setAccountFormData({
                                        ...accountFormData,
                                        firstName: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div class="mb-3">
                                  <label class="form-label">
                                    Last Name <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter last name"
                                    value={accountFormData.lastName}
                                    onChange={(e) =>
                                      setAccountFormData({
                                        ...accountFormData,
                                        lastName: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div class="mb-3 position-relative">
                                  <label class="form-label">
                                    SSN <span className="text-danger">*</span>
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type={showSSN ? "text" : "password"} // Toggle between "text" and "password"
                                      class={`form-control ${!validateSSN(accountFormData.ssn) && ssnFocused ? "invalid-background" : ""}`}
                                      placeholder="XXX-XX-XXXX"
                                      value={accountFormData.ssn}
                                      onChange={handleSSNChange}
                                      onFocus={() => {
                                        setShowSSNTooltip(true);
                                        setSSNFocused(true);
                                      }}
                                      onBlur={() => {
                                        setShowSSNTooltip(false);
                                        setSSNFocused(false);
                                      }}
                                      required
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      onMouseDown={() => setShowSSN(true)} // Show SSN on mouse down
                                      onMouseUp={() => setShowSSN(false)} // Hide SSN on mouse up
                                      onMouseLeave={() => setShowSSN(false)} // Hide SSN if mouse leaves the button
                                    >
                                      Show
                                    </button>
                                  </div>
                                  <Tooltip
                                    messages={[
                                      { text: "SSN must be in the format XXX-XX-XXXX", valid: validateSSN(accountFormData.ssn) },
                                    ]}
                                    visible={showSSNTooltip}
                                  />
                                </div>
                                <div class="mb-3 position-relative">
                                  <label class="form-label">
                                    Salary <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    class={`form-control ${!validateSalary(accountFormData.salary) && salaryFocused ? "invalid-background" : ""}`}
                                    placeholder="Enter salary"
                                    value={accountFormData.salary}
                                    onChange={handleSalaryChange}
                                    onFocus={() => {
                                      setShowSalaryTooltip(true);
                                      setSalaryFocused(true);
                                    }}
                                    onBlur={() => {
                                      setShowSalaryTooltip(false);
                                      setSalaryFocused(false);
                                    }}
                                    required
                                  />
                                  <Tooltip
                                    messages={[
                                      { text: "Salary must be greater than zero", valid: parseFloat(accountFormData.salary) > 0 },
                                    ]}
                                    visible={showSalaryTooltip && !validateSalary(accountFormData.salary)}
                                  />
                                </div>
                                <div class="mb-3 position-relative">
                                  <label class="form-label">
                                    Start Date <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="date"
                                    class="form-control"
                                    value={accountFormData.startDate}
                                    onChange={(e) => setAccountFormData({ ...accountFormData, startDate: e.target.value })}
                                    onBlur={(e) => {
                                      const date = e.target.value;
                                      if (date && !validateStartDate(date)) {
                                        setShowStartDateTooltip(true);
                                        alert("Start date must be within the last 5 years and not more than 1 year ahead.");
                                      } else {
                                        setShowStartDateTooltip(false);
                                      }
                                    }}
                                    onFocus={() => {
                                      if (accountFormData.startDate) {
                                        setShowStartDateTooltip(true);
                                      }
                                    }}
                                    required
                                  />
                                  <Tooltip
                                    messages={[
                                      { text: "Start date must be within the last 5 years and not more than 1 year ahead.", valid: validateStartDate(accountFormData.startDate) },
                                    ]}
                                    visible={showStartDateTooltip}
                                  />
                                </div>
                              </>
                            )}

                            <button
                              type="submit"
                              class="btn btn-lightergreen mt-3 w-100"
                              onClick={(e) => {
                                if (!validateEmail(accountFormData.email)) {
                                  e.preventDefault();
                                  setShowEmailTooltip(true);
                                }
                              }}
                              disabled={accountType === "supplier" ? !isSupplierFormValid() : !isEmployeeFormValid()}
                            >
                              Add{" "}
                              {accountType === "supplier"
                                ? "Supplier"
                                : "Employee"}
                            </button>
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

      {showPasswordModal && (
        <div>
          <div className="fade modal-backdrop show"></div>
          <div className="fade modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Employee Added Successfully</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowPasswordModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Please save this one-time password and share it securely
                    with the employee:
                  </p>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={oneTimePassword}
                      readOnly
                    />
                    <button
                      className="btn btn-mint"
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(oneTimePassword);
                        alert("Password copied to clipboard!");
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-green"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {reOrderProductsModal && (
        <div>
          <div class="fade modal-backdrop show"></div>
          <div
            role="dialog"
            aria-modal="true"
            class="fade modal show"
            tabindex="-1"
            style={{ paddingLeft: "0px", display: "block" }}
          >
            <div class="modal-dialog modal-md modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-content-dialog">
                  <div class="modal-content-content">
                    <div class="p-5 modal-body rounded-3">
                      <div class="position-absolute top-0 end-0 me-3 mt-3">
                        <button
                          type="button"
                          class="btn-close btn-close-primary close-modal"
                          onClick={toggleReOrderProductsModal}
                        ></button>
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
                                <button
                                  class="btn btn-products-dropdown btn-outline-none dropdown-toggle w-100 py-3 text-black"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Products
                                </button>
                                <ul class="dropdown-menu w-100">
                                  <li>
                                    <input
                                      class="form-check-input me-1 ms-4"
                                      type="checkbox"
                                      value=""
                                      id=""
                                    ></input>
                                    <label class="form-check-label ms-2" for="">
                                      Apples
                                    </label>
                                  </li>
                                  <li>
                                    <input
                                      class="form-check-input me-1 ms-4"
                                      type="checkbox"
                                      value=""
                                      id=""
                                    ></input>
                                    <label class="form-check-label ms-2" for="">
                                      Milk
                                    </label>
                                  </li>
                                  <li>
                                    <input
                                      class="form-check-input me-1 ms-4"
                                      type="checkbox"
                                      value=""
                                      id=""
                                    ></input>
                                    <label class="form-check-label ms-2" for="">
                                      Bananas
                                    </label>
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

                            <button
                              type="submit"
                              class="btn btn-lightergreen mt-4"
                            >
                              Place Order
                            </button>
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
          <div
            role="dialog"
            aria-modal="true"
            class="fade modal show"
            tabindex="-1"
            style={{ paddingLeft: "0px", display: "block" }}
          >
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-content-dialog">
                  <div class="modal-content-content">
                    <div class="p-5 modal-body bg-green rounded-3">
                      <div class="position-absolute top-0 end-0 me-3 mt-3">
                        <button
                          type="button"
                          class="btn-close btn-close-primary close-modal"
                          onClick={toggleCreateProductModal}
                        ></button>
                      </div>
                      <div class="card-lg card border-0">
                        <div class="p-5 card-body">
                          <h3 class="text-center mb-4">Create Product</h3>
                          <form onSubmit={handleCreateProduct}>
                            <div className="mb-3">
                              <label className="form-label">
                                Product Category
                              </label>
                              <select
                                name="categoryId"
                                className="form-select"
                                required
                              >
                                <option value="">Select a category</option>
                                <option value="1">Fruits</option>
                                <option value="2">Vegetables</option>
                                <option value="3">Meats</option>
                                <option value="4">Dairy</option>
                                <option value="5">Snacks</option>
                                <option value="6">Meals</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Product Name</label>
                              <input
                                type="text"
                                name="productName"
                                className="form-control"
                                placeholder="e.g. Apples"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Product Description
                              </label>
                              <textarea
                                name="productDescription"
                                className="form-control"
                                placeholder="e.g. Fresh red apples"
                                required
                              ></textarea>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Brand</label>
                              <input
                                type="text"
                                name="brand"
                                className="form-control"
                                placeholder="e.g. Fresh Foods"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Product Image URL
                              </label>
                              <input
                                type="text"
                                name="pictureUrl"
                                className="form-control"
                                placeholder="e.g. apples.jpg"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Quantity</label>
                              <input
                                type="number"
                                name="quantity"
                                className="form-control"
                                min="0"
                                step="1"
                                placeholder="e.g. 100"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Recommended Reorder Level
                              </label>
                              <input
                                type="number"
                                name="reorderLevel"
                                className="form-control"
                                min="0"
                                step="1"
                                placeholder="e.g. 20"
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <label className="form-label">Price ($)</label>
                              <input
                                type="number"
                                name="price"
                                className="form-control"
                                min="0.01"
                                step="0.01"
                                placeholder="e.g. 1.99"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Weight (in oz)
                              </label>
                              <input
                                type="number"
                                name="weight"
                                className="form-control"
                                min="0.01"
                                step="0.01"
                                placeholder="e.g. 0.5"
                                required
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-lightergreen mt-3 w-100"
                            >
                              Create Product
                            </button>
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

      {showEditProductModal && editingProduct && (
        <div>
          <div className="fade modal-backdrop show"></div>
          <div className="fade modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Product</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowEditProductModal(false);
                      setEditingProduct(null);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSaveEdit}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Product Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editingProduct.PRODUCTNAME}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              PRODUCTNAME: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Brand</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editingProduct.BRAND}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              BRAND: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label className="form-label">Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={editingProduct.PRICE}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              PRICE: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Weight (ounces)</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={editingProduct.WEIGHT}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              WEIGHT: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          value={editingProduct.QUANTITY}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              QUANTITY: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Recommended Reorder Level
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={editingProduct.REORDERLEVEL}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            REORDERLEVEL: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={editingProduct.PRODUCTDESCRIPTION}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            PRODUCTDESCRIPTION: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-mint"
                        onClick={() => {
                          setShowEditProductModal(false);
                          setEditingProduct(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-green">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOrderModal && selectedProduct && (
        <div>
          <div className="fade modal-backdrop show"></div>
          <div className="fade modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Order Product: {selectedProduct.PRODUCTNAME}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowOrderModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handlePlaceOrder}>
                    <div className="mb-3">
                      <label className="form-label">Select Supplier</label>
                      <select
                        className="form-select"
                        value={orderData.supplierName}
                        onChange={(e) =>
                          setOrderData({
                            ...orderData,
                            supplierName: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Choose a supplier</option>
                        {suppliers.map((supplier) => (
                          <option
                            key={supplier.ID}
                            value={supplier.SUPPLIERNAME}
                          >
                            {supplier.SUPPLIERNAME}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        value={orderData.quantity}
                        onChange={(e) =>
                          setOrderData({
                            ...orderData,
                            quantity: e.target.value,
                          })
                        }
                        min="1"
                        required
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-mint"
                        onClick={() => setShowOrderModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-green">
                        Place Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showResetPasswordModal && (
        <div>
          <div className="fade modal-backdrop show"></div>
          <div
            role="dialog"
            aria-modal="true"
            className="fade modal show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Reset Password</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleResetPasswordModal}
                  ></button>
                </div>
                <form onSubmit={handleResetPassword}>
                  <div className="modal-body">
                    <div className="mb-3 position-relative">
                      <label className="form-label">
                        New Password <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                          className={`form-control ${passwordError && passwordFocused ? "invalid-background" : ""}`}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          onFocus={() => {
                            setShowPasswordTooltip(true);
                            setPasswordFocused(true);
                          }}
                          onBlur={() => {
                            setShowPasswordTooltip(false);
                            setPasswordFocused(false);
                          }}
                          required
                          minLength="14"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onMouseDown={() => setShowPassword(true)} // Show password on mouse down
                          onMouseUp={() => setShowPassword(false)} // Hide password on mouse up
                          onMouseLeave={() => setShowPassword(false)} // Hide password if mouse leaves the button
                        >
                          Show
                        </button>
                      </div>
                      <Tooltip messages={validatePassword(newPassword)} visible={showPasswordTooltip} />
                    </div>
                    <div className="mb-3 position-relative">
                      <label className="form-label">
                        Confirm New Password <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type={showConfirmPassword ? "text" : "password"} // Toggle between "text" and "password"
                          className={`form-control ${!passwordsMatch && confirmPasswordFocused ? "invalid-background" : ""}`}
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          onFocus={() => {
                            setShowConfirmPasswordTooltip(true);
                            setConfirmPasswordFocused(true);
                          }}
                          onBlur={() => {
                            setShowConfirmPasswordTooltip(false);
                            setConfirmPasswordFocused(false);
                          }}
                          required
                          disabled={!isPasswordValid}
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onMouseDown={() => setShowConfirmPassword(true)} // Show confirm password on mouse down
                          onMouseUp={() => setShowConfirmPassword(false)} // Hide confirm password on mouse up
                          onMouseLeave={() => setShowConfirmPassword(false)} // Hide confirm password if mouse leaves the button
                        >
                          Show
                        </button>
                      </div>
                      <Tooltip
                        messages={[
                          { text: "Passwords must match", valid: passwordsMatch },
                        ]}
                        visible={showConfirmPasswordTooltip}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-mint"
                      onClick={toggleResetPasswordModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-green"
                      disabled={!newPassword || !passwordsMatch}
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ManagerDashboard;
