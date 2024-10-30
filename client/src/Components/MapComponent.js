import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9oaXRoajciLCJhIjoiY20ydXUxYW1jMDU5dTJtcTFpMWQ3bWJwaiJ9.UcGe047ZxxncwUDA4QWfuQ';

export default function MapComponent({ routeData }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const START_LAT = 37.337214;
  const START_LNG = -121.882696;

  useEffect(() => {
    if (!routeData) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [START_LNG, START_LAT],
      zoom: 13,
    });

    map.current.on('load', () => {
      // Add route line
      map.current.addSource('route', {
        type: 'geojson',
        data: routeData.trips[0].geometry,
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#1DB954',
          'line-width': 5,
        },
      });

      // Add markers for waypoints
      routeData.waypoints.forEach((waypoint, index) => {
        new mapboxgl.Marker()
          .setLngLat(waypoint.location)
          .setPopup(new mapboxgl.Popup().setText(`Stop ${index}`))
          .addTo(map.current);
      });

      // Simulate robot movement
      const routeCoordinates = routeData.trips[0].geometry.coordinates;
      const robotMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(routeCoordinates[0])
        .addTo(map.current);

      let counter = 0;
      function animate() {
        if (counter < routeCoordinates.length) {
          robotMarker.setLngLat(routeCoordinates[counter]);
          counter++;
          setTimeout(animate, 100); // Adjust speed here (milliseconds)
        }
      }
      animate();
    });

    return () => map.current.remove();
  }, [routeData]);

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
  );
}