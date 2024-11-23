import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DeliveryFleetManagement() {
  const { saleId } = useParams();
  const [deliveryData, setDeliveryData] = useState({
    batteryLevel: 75,
    location: {
      latitude: 40.7128,
      longitude: -74.006,
      timestamp: new Date().toISOString(),
    },
    robotStatus: "HOME",
    orderStatus: "PENDING",
    estimatedDeliveryTime: "2024-03-21 15:30:00",
    currentStatus: "Waiting for robot assignment",
  });
  const [isRobotAssigned, setIsRobotAssigned] = useState(false);

  const handleAssignRobot = () => {
    setIsRobotAssigned(true);
    setDeliveryData((prev) => ({
      ...prev,
      robotStatus: "DELIVERING",
      orderStatus: "IN_PROGRESS",
    }));

    // Simulate robot movement with location updates
    let currentLocation = 0;
    const locations = [
      { lat: 40.7138, lng: -74.005, status: "Robot en route" },
    ];

    if (currentLocation < locations.length) {
      setDeliveryData((prev) => ({
        ...prev,
        location: {
          latitude: locations[currentLocation].lat,
          longitude: locations[currentLocation].lng,
          timestamp: new Date().toISOString(),
        },
        orderStatus:
          currentLocation === locations.length - 1
            ? "COMPLETED"
            : "IN_PROGRESS",
        robotStatus:
          currentLocation === locations.length - 1 ? "HOME" : "DELIVERING",
        currentStatus: locations[currentLocation].status,
      }));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card border border-2">
            <div className="card-header bg-white p-4 d-flex justify-content-between align-items-center">
              <h3 className="fs-4 mb-0">Delivery Status #{saleId}</h3>
              {!isRobotAssigned && (
                <button className="btn btn-green" onClick={handleAssignRobot}>
                  Assign Robot for Delivery
                </button>
              )}
            </div>

            <div className="card-body p-4">
              {/* Status Cards Section */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Robot Battery Status</h5>
                      <div className="progress mb-2">
                        <div
                          className={`progress-bar ${
                            deliveryData.batteryLevel < 20
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                          role="progressbar"
                          style={{ width: `${deliveryData.batteryLevel}%` }}
                          aria-valuenow={deliveryData.batteryLevel}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {deliveryData.batteryLevel}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Current Location</h5>
                      <p className="mb-1">
                        <strong>Latitude:</strong>{" "}
                        {deliveryData.location.latitude}
                      </p>
                      <p className="mb-1">
                        <strong>Longitude:</strong>{" "}
                        {deliveryData.location.longitude}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Delivery Status</h5>
                      <div className="mb-2">
                        <span
                          className={`badge ${
                            deliveryData.orderStatus === "COMPLETED"
                              ? "bg-success"
                              : deliveryData.orderStatus === "IN_PROGRESS"
                              ? "bg-mint"
                              : "bg-warning"
                          }`}
                        >
                          {deliveryData.orderStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Location Tracking Section */}
              <div className="mt-4">
                <h5 className="mb-3">Live Location Tracking</h5>
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">
                        Current Status: {deliveryData.currentStatus}
                      </h6>
                    </div>

                    <div className="progress" style={{ height: "30px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                          width: isRobotAssigned
                            ? deliveryData.orderStatus === "COMPLETED"
                              ? "100%"
                              : "50%"
                            : "0%",
                        }}
                        aria-valuenow={
                          isRobotAssigned
                            ? deliveryData.orderStatus === "COMPLETED"
                              ? 100
                              : 50
                            : 0
                        }
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {isRobotAssigned
                          ? deliveryData.orderStatus === "COMPLETED"
                            ? "Delivery Completed"
                            : "In Transit"
                          : "Waiting for Assignment"}
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="d-flex justify-content-between">
                        <span>Warehouse</span>
                        <span>Customer Location</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <strong>Current Coordinates:</strong>
                      <p className="mb-0">
                        Latitude: {40.7158}, Longitude:{""}
                        {deliveryData.location.longitude}
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
  );
}

export default DeliveryFleetManagement;
