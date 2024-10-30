import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import axios from 'axios';

function DeliveryRoutePage() {
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    async function fetchRouteData() {
      try {
        const response = await axios.get('http://localhost:8080/route');
        setRouteData(response.data);
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    }

    fetchRouteData();
  }, []);

  return (
    <div>
      <h1>Delivery Route</h1>
      {routeData ? (
        <MapComponent routeData={routeData} />
      ) : (
        <p>Loading route...</p>
      )}
    </div>
  );
}

export default DeliveryRoutePage;