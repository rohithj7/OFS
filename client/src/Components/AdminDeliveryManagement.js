import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Include Mapbox CSS

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9oaXRoajciLCJhIjoiY20ydXUxYW1jMDU5dTJtcTFpMWQ3bWJwaiJ9.UcGe047ZxxncwUDA4QWfuQ';

const warehouseLocation = {
  latitude: 37.337214,
  longitude: -121.882696,
};

const AdminDeliveryManagement = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const botMarkerRef = useRef(null);

  useEffect(() => {
    // Initialize the map only once
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [warehouseLocation.longitude, warehouseLocation.latitude],
      zoom: 12,
    });

    // Add warehouse marker
    new mapboxgl.Marker()
      .setLngLat([warehouseLocation.longitude, warehouseLocation.latitude])
      .addTo(mapRef.current);

    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:8082');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'route_update') {
        handleRouteUpdate(message.data);
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
  }, []);

  const handleRouteUpdate = (data) => {
    const route = data.trips[0].geometry;

    // Wait until the map is fully loaded
    if (mapRef.current.isStyleLoaded()) {
      addRouteLayer(route);
    } else {
      mapRef.current.on('load', () => {
        addRouteLayer(route);
      });
    }

    // Extract destination coordinates from the waypoints
    const waypoints = data.waypoints;

    waypoints.forEach((waypoint, index) => {
      const [longitude, latitude] = waypoint.location;
      // Add markers for each waypoint
      new mapboxgl.Marker({ color: index === waypoints.length - 1 ? 'red' : 'blue' })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);
    });
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
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default AdminDeliveryManagement;