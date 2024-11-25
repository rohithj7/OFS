import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9oaXRoajciLCJhIjoiY20ydXUxYW1jMDU5dTJtcTFpMWQ3bWJwaiJ9.UcGe047ZxxncwUDA4QWfuQ';

// Warehouse location (replace with actual coordinates)
const warehouseLocation = {
  latitude: 37.337214,
  longitude: -121.882696,
};

const DeliveryPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const botMarkerRef = useRef(null);
  const customerMarkerRef = useRef(null);
  const warehouseMarkerRef = useRef(null);

  const [customerLocation, setCustomerLocation] = useState(null);
  const customerLocationRef = useRef(null);

  const [eta, setEta] = useState(null);
  const [pendingRouteData, setPendingRouteData] = useState(null);

  const [deliveryInProgress, setDeliveryInProgress] = useState(false);
  const deliveryInProgressRef = useRef(true);

  useEffect(() => {
    // Fetch the delivery status
    axios
      .get("http://localhost:8080/sale-status", { withCredentials: true })
      .then((response) => {
        const { ongoing } = response.data; // Extract the 'ongoing' value from the response
        setDeliveryInProgress(ongoing); // Update the state
      })
      .catch((error) => {
        console.error("Error fetching delivery status:", error);
      });
  }, []); // Empty dependency array ensures this runs only on component mount
  
  // Synchronize the state and ref
  useEffect(() => {
    deliveryInProgressRef.current = deliveryInProgress;
  }, [deliveryInProgress]);

  useEffect(() => {
    // Initialize the map only once
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [warehouseLocation.longitude, warehouseLocation.latitude],
      zoom: 12,
    });

    // Ensure the map is fully loaded before adding markers and layers
    mapRef.current.on('load', () => {
      // Add warehouse marker
      addWarehouseMarker();

      // Fetch and add customer marker
      fetchCustomerLocation();
    });

    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:8082');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      if (!deliveryInProgressRef.current) {
        // Ignore messages if delivery is not in progress
        return;
      }

      const message = JSON.parse(event.data);
      if (message.type === 'route_update') {
        if (customerLocationRef.current) {
          handleRouteUpdate(message.data);
        } else {
          setPendingRouteData(message.data);
        }
      } else if (message.type === 'bot_position') {
        handleBotPositionUpdate(message.data.position);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []); // Empty dependency array to run once on mount

  // Function to add the warehouse marker
  const addWarehouseMarker = () => {
    // Remove existing warehouse marker if any
    if (warehouseMarkerRef.current) {
      warehouseMarkerRef.current.remove();
    }

    // Add warehouse marker
    warehouseMarkerRef.current = new mapboxgl.Marker()
      .setLngLat([warehouseLocation.longitude, warehouseLocation.latitude])
      .addTo(mapRef.current);
  };

  // Function to fetch customer location and add marker
  const fetchCustomerLocation = () => {
    axios
      .get('http://localhost:8080/customerlocation', { withCredentials: true })
      .then((response) => {
        const { LATITUDE: latitude, LONGITUDE: longitude } = response.data;
        setCustomerLocation({ latitude, longitude });
        customerLocationRef.current = { latitude, longitude };

        // Add customer marker
        if (!customerMarkerRef.current) {
          customerMarkerRef.current = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);
        } else {
          customerMarkerRef.current.setLngLat([longitude, latitude]);
        }

        // If there is pending route data, process it
        if (pendingRouteData) {
          handleRouteUpdate(pendingRouteData);
          setPendingRouteData(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching customer location:', error);
      });
  };

  // Handle route update when both customerLocation and pendingRouteData are available
  useEffect(() => {
    if (customerLocation && pendingRouteData) {
      handleRouteUpdate(pendingRouteData);
      setPendingRouteData(null);
    }
  }, [customerLocation, pendingRouteData]);

  const handleRouteUpdate = async (data) => {
    if (!customerLocationRef.current) {
      console.warn('Customer location not available yet.');
      return;
    }

    const waypoints = data.waypoints;

    // Find the index of the customer's waypoint
    let customerWaypointIndex = -1;
    for (let i = 0; i < waypoints.length; i++) {
      const [longitude, latitude] = waypoints[i].location;
      if (
        Math.abs(latitude - customerLocationRef.current.latitude) < 0.001 &&
        Math.abs(longitude - customerLocationRef.current.longitude) < 0.001
      ) {
        customerLocationRef.current = { latitude, longitude };
        customerWaypointIndex = i;
        break;
      }
    }

    if (customerWaypointIndex === -1) {
      console.warn('Customer location not found in waypoints');
      return;
    }

    // Extract waypoints up to and including the customer's waypoint
    const waypointsUpToCustomer = waypoints.slice(0, customerWaypointIndex + 1);

    // Build the coordinates array
    const coordinates = waypointsUpToCustomer.map((waypoint) => waypoint.location);

    // Build the coordinates string for the API call
    const coordinatesString = coordinates
      .map((coord) => `${coord[0]},${coord[1]}`)
      .join(';');
    console.log(coordinatesString);

    // Call the Mapbox API to get the route
    const url =
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinatesString}` +
      `?access_token=sk.eyJ1Ijoicm9oaXRoajciLCJhIjoiY20ydXU1bTgwMDVpZzJrb3B6bHc0ZTk1eSJ9.0S0dhzymGb8hPmhXw_kXXg` +
      `&geometries=geojson` +
      `&overview=full`;

    try {
      const response = await axios.get(url);
      const routeData = response.data;
      console.log('routeData:', JSON.stringify(routeData, null, 2));
      console.log(routeData.code);
      if (routeData.code !== 'Ok') {
        console.error('Mapbox API Error:', routeData.message || routeData);
        return;
      }

      if (!routeData.routes || routeData.routes.length === 0) {
        console.error('No routes found:', routeData);
        return;
      }

      const route = routeData.routes[0].geometry;

      if (mapRef.current.isStyleLoaded()) {
        addRouteLayer(route);
      } else {
        mapRef.current.on('load', () => {
          addRouteLayer(route);
        });
      }

      // Smoothly zoom into the route
      const routeCoordinates = route.coordinates;
      const bounds = routeCoordinates.reduce(function (bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(routeCoordinates[0], routeCoordinates[0]));

      mapRef.current.fitBounds(bounds, {
        padding: 50,
        animate: true,
        duration: 1000,
      });

      // Set ETA
      const durationSeconds = routeData.routes[0].duration;
      setEta(durationSeconds);
    } catch (error) {
      console.error('Error fetching route from Mapbox API:', error);
    }
  };

  const addRouteLayer = (route) => {
    // Add the route as a layer on the map
    if (mapRef.current.getSource('route')) {
      mapRef.current.getSource('route').setData(route);
    } else {
      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: route,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75,
        },
      });
    }
  };

  const handleBotPositionUpdate = (position) => {
    const [longitude, latitude] = position;

    if (!botMarkerRef.current) {
      botMarkerRef.current = new mapboxgl.Marker({ color: 'green' })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);
    } else {
      botMarkerRef.current.setLngLat([longitude, latitude]);
    }

    // Check if the bot has reached the customer's location
    const customerLoc = customerLocationRef.current;
    if (
      customerLoc &&
      Math.abs(latitude - customerLoc.latitude) < 0.0001 &&
      Math.abs(longitude - customerLoc.longitude) < 0.0001
    ) {
      // Update the sale status
      axios
        .put("http://localhost:8080/update-sale-status", {}, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          // Reset the map after the sale status is updated
          resetMap();
        })
        .catch((error) => {
          console.error('Error updating sale status:', error);
        });
    }
  };

  const resetMap = () => {
    // Remove the route layer and source if they exist
    if (mapRef.current.getLayer('route')) {
      mapRef.current.removeLayer('route');
    }
    if (mapRef.current.getSource('route')) {
      mapRef.current.removeSource('route');
    }

    // Remove the bot marker
    if (botMarkerRef.current) {
      botMarkerRef.current.remove();
      botMarkerRef.current = null;
    }

    // Remove the customer marker
    if (customerMarkerRef.current) {
      customerMarkerRef.current.remove();
      customerMarkerRef.current = null;
    }

    // Reset the map view to the initial center and zoom
    mapRef.current.flyTo({
      center: [warehouseLocation.longitude, warehouseLocation.latitude],
      zoom: 12,
    });

    // Reset the ETA state
    setEta(null);

    // Reset the customer location
    setCustomerLocation(null);
    customerLocationRef.current = null;

    // Set delivery to not in progress
    setDeliveryInProgress(false);
    deliveryInProgressRef.current = false;

    // Re-add the warehouse marker
    addWarehouseMarker();

    // Re-fetch and add the customer marker
    fetchCustomerLocation();
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} min ${remainingSeconds} sec`;
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '600px' }} />
      {eta !== null && (
        <div style={{ marginTop: '10px', fontSize: '16px' }}>
          <strong>Estimated Time of Arrival:</strong> {formatDuration(eta)}
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;