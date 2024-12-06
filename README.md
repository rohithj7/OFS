# GroceryGo - On-Demand Food Delivery Service

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

**GroceryGo** is an innovative on-demand food delivery service designed for "OFS," a new local food retailer chain in the San Jose Downtown area. This platform allows customers to purchase organic food items online, manage their orders through a virtual shopping cart, make secure payments, and have their groceries delivered directly to their homes using a robot self-driving vehicle.

## Problem Statement

We have been tasked with developing a comprehensive solution for OFS to implement delivery services as part of their business expansion plan. The primary objectives are:

- **Online Ordering:** Enable customers to browse and purchase organic food items (e.g., fruits, vegetables, and other groceries) through a user-friendly website.
  
- **Virtual Shopping Cart:** Allow customers to add items to a virtual shopping cart, review their selections, and proceed to checkout seamlessly.
  
- **Secure Payment Processing:** Facilitate secure online payments for orders using integrated payment gateways.
  
- **Efficient Delivery System:** Utilize robot self-driving vehicles capable of handling up to 10 different orders (up to 200 lbs) per trip. The system should:
  - **Optimize Delivery Routes:** Implement mapping services (Google Maps, MapBox, etc.) to plan the most efficient delivery paths.
  - **Handle Multiple Orders:** Manage multiple orders simultaneously, ensuring optimal routing and timely deliveries.
  - **Delivery Charges:** Offer free delivery for orders under 20 pounds and add a $10 delivery charge for heavier orders.
  
- **Inventory and Management Dashboard:** Provide store employees and managers with a dashboard to update inventory, track orders, and query the database efficiently.
  
- **Database Management:** Use a robust RDBMS to process and store inventory data, customer information, and transaction records, ensuring data integrity and accessibility.

## Features

- **User-Friendly Interface:** Intuitive website design for easy navigation and seamless shopping experience.
  
- **Secure Authentication:** Protect user data with secure login and authentication mechanisms.
  
- **Real-Time Inventory Management:** Keep track of available products and update stock levels in real-time.
  
- **Optimized Delivery Routing:** Intelligent routing algorithms to ensure timely and efficient deliveries.
  
- **Automated Order Processing:** Streamlined backend processes for handling orders, payments, and deliveries.
  
- **Dashboard for Management:** Comprehensive dashboard for store employees and managers to oversee operations.
  
- **Scalable Architecture:** Designed to handle growing numbers of users and orders without compromising performance.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MySQL (RDBMS)
- **Containerization:** Docker, Docker Compose
- **Mapping Services:** Google Maps API / MapBox
- **Payment Processing:** Stripe API
- **Version Control:** Git & GitHub

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker:** [Download and Install Docker](https://www.docker.com/get-started)

### Steps

1. **Create a New Directory**

   Open your terminal or command prompt and create a new directory for the project:

   ```bash
   mkdir grocerygo
   cd grocerygo
   ```

2. **Add `docker-compose.yml` and `.env` Files**

   - **`docker-compose.yml`:** Create a file named `docker-compose.yml` in the `grocerygo` directory and paste the following content:

     ```yaml
        version: '3.8'

        services:
        mysql:
            image: wtpotu/grocerygo-mysql:latest
            container_name: mysql_container
            environment:
            MYSQL_ROOT_PASSWORD: "${MYSQL_PASSWORD}"      # Set via .env
            MYSQL_DATABASE: "${MYSQL_DATABASE}"          # Set via .env
            ports:
            - "3307:3306"
            networks:
            - ofs-network
            healthcheck:
            test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
            interval: 10s
            timeout: 5s
            retries: 5

        backend:
            image: wtpotu/grocerygo-backend:latest
            container_name: backend_container
            environment:
            MYSQL_HOST: "mysql"                           # Service name for networking
            MYSQL_USER: "${MYSQL_USER}"                   # Set via .env
            MYSQL_PASSWORD: "${MYSQL_PASSWORD}"           # Set via .env
            MYSQL_DATABASE: "${MYSQL_DATABASE}"           # Set via .env
            SESSION_SECRET: "${SESSION_SECRET}"           # Set via .env
            PORT: "${PORT}"                               # Set via .env
            ports:
            - "8080:8080"
            depends_on:
            mysql:
                condition: service_healthy
            networks:
            - ofs-network

        frontend:
            image: wtpotu/grocerygo-frontend:latest
            container_name: frontend_container
            ports:
            - "3000:80"
            networks:
            - ofs-network

        networks:
        ofs-network:
            driver: bridge
     ```

   - **`.env` File:** Create a file named `.env` in the same directory and populate it with the necessary environment variables:

     ```env
        MYSQL_HOST=mysql
        MYSQL_USER=root
        MYSQL_PASSWORD=your_secure_mysql_password
        MYSQL_DATABASE=OFS
        SESSION_SECRET=4a49351ed8e9dc415f0c309a79a6dd96e5e710f2c26194f35c407cf5a02f893c527eb9a10ee13f7c16da0bc4f1ce458b32218661c73b3c98b00bdb01b3de83cd
        PORT=8080
        MAPBOX_ACCESS_TOKEN=sk.eyJ1Ijoicm9oaXRoajciLCJhIjoiY20ydXU1bTgwMDVpZzJrb3B6bHc0ZTk1eSJ9.0S0dhzymGb8hPmhXw_kXXg
        WAREHOUSE_LATITUDE=37.337214
        WAREHOUSE_LONGITUDE=-121.882696
        STRIPE_SECRET_KEY=sk_test_51QLGHpBI56iyGeVw7vixDjbv8wgta47cPytCC0g6AhVzOXFFlsmfigNzcUDa8ojKxZg6dGDl3RQlJGK2aOQ1lqZh00GsqMZSfv
        REACT_APP_MAPBOX_ACCESS_TOKEN=pk.eyJ1Ijoicm9oaXRoajciLCJhIjoiY20ydXUxYW1jMDU5dTJtcTFpMWQ3bWJwaiJ9.UcGe047ZxxncwUDA4QWfuQ
        REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBdbx7J3WYyUiIggLGMEQNThitq2bROL6c
     ```

     **Security Note:**  
     - **Do not** share your `.env` file publicly as it contains sensitive information.
     - Ensure that `.env` is added to your `.gitignore` if you plan to use version control.

3. **Pull the Docker Images**

   Execute the following commands to pull the necessary Docker images:

   ```bash
   docker pull wtpotu/grocerygo-mysql:latest
   docker pull wtpotu/grocerygo-backend:latest
   docker pull wtpotu/grocerygo-frontend:latest
   ```

4. **Run Docker Compose**

   With the `docker-compose.yml` and `.env` files in place, run the following command to build and start the containers:

   ```bash
   docker-compose up --build
   ```

   - `--build`: Forces a rebuild of the Docker images.

   The containers will run in the background, setting up the MySQL database, backend server, and frontend application.

## Configuration

### Environment Variables

The application relies on several environment variables defined in the `.env` file. Here's a breakdown of each:

- **MySQL Configuration:**
  - `MYSQL_HOST`: Hostname for the MySQL service (set to mysql in Docker Compose).
  - `MYSQL_PASSWORD`: Password for the MySQL root user.
  - `MYSQL_DATABASE`: Name of the default database to be created.

- **Backend Configuration:**
  - `MYSQL_USER`: Username for connecting to the MySQL database.
  - `MYSQL_PASSWORD`: Password for the MySQL user.
  - `SESSION_SECRET`: Secret key for session management.
  - `PORT`: Port on which the backend server will run.

- **Additional Configuration:**
  - `MAPBOX_ACCESS_TOKEN`: Token for MapBox API to handle mapping services.
  - `WAREHOUSE_LATITUDE`: Latitude coordinate of the warehouse location.
  - `WAREHOUSE_LONGITUDE`: Longitude coordinate of the warehouse location.
  - `STRIPE_SECRET_KEY`: Secret key for Stripe API to handle payments.
  - `REACT_APP_MAPBOX_ACCESS_TOKEN`: Token for MapBox in the React frontend.
  - `REACT_APP_GOOGLE_MAPS_API_KEY`: API key for Google Maps integration.

**Note:**  
Ensure all environment variables are set correctly to allow seamless communication between services and proper functionality of the application.

## Usage

Once the containers are up and running, you can access the application through your web browser.

1. **Access the Frontend:**

   Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

   This will load the GroceryGo frontend application, where you can browse products, add items to your cart, and place orders.

2. **Access the Backend:**

   The backend server runs on port `8080`. You can interact with backend APIs or administrative tools (if any) by navigating to:

   ```
   http://localhost:8080
   ```

3. **Access the MySQL Database:**

   The MySQL database is accessible on port `3307` of your host machine. You can connect using any MySQL client with the following credentials:

   - **Host:** `localhost`
   - **Port:** `3307`
   - **Username:** As defined in your `.env` (`MYSQL_USER`)
   - **Password:** As defined in your `.env` (`MYSQL_PASSWORD`)
   - **Database:** As defined in your `.env` (`MYSQL_DATABASE`)

   **Example:**

   ```bash
   mysql -h localhost -P 3307 -u your_mysql_user -pOFS
   ```

   Enter the `MYSQL_PASSWORD` when prompted.

*Thank you for using GroceryGo! We hope this application enhances your shopping and delivery experience.*