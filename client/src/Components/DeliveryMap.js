import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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

    // Extract destination coordinates from the last waypoint
    const waypoints = data.waypoints;
    const lastWaypoint = waypoints[waypoints.length - 1];
    const [destLongitude, destLatitude] = lastWaypoint.location;

    // Add destination marker
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([destLongitude, destLatitude])
      .addTo(mapRef.current);
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
    <div>
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '600px' }}
      />
    </div>
  );
};

export default DeliveryPage;