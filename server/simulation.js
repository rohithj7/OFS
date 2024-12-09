import { broadcastBotPosition } from './websocket.js';
import { completeRoute, updateSaleStatus } from './database.js';

// Define the proximity threshold
const PROXIMITY_THRESHOLD = 0.0005; // Adjust as needed

export function simulateBotMovement(routeData, routeId, deliveryCoords) {
  const coordinates = routeData.trips[0].geometry.coordinates;
  let index = 0;

  // Set to keep track of already completed saleIds to prevent duplicate updates
  const completedSaleIds = new Set();

  // Preprocess deliveryCoords to group sales by their coordinates for potential optimizations
  // Although with proximity checks, this may not be strictly necessary
  // It's kept here in case you want to optimize further in the future
  const salesList = deliveryCoords.map(({ saleId, latitude, longitude }) => ({
    saleId,
    latitude,
    longitude,
  }));

  const interval = setInterval(async () => {
    if (index < coordinates.length) {
      const currentPosition = coordinates[index];
      const longitude = parseFloat(currentPosition[0]);
      const latitude = parseFloat(currentPosition[1]);
      console.log(`latitude check: ${latitude}`);
      console.log(`longitude check: ${longitude}`);

      // Broadcast the current position to clients
      broadcastBotPosition(currentPosition);

      // Iterate over all delivery coordinates to check for proximity
      for (const sale of salesList) {
        // Skip if this sale has already been completed
        if (completedSaleIds.has(sale.saleId)) continue;

        const latDiff = Math.abs(latitude - sale.latitude);
        const lonDiff = Math.abs(longitude - sale.longitude);
        console.log(`latDiff: ${latDiff}`);
        console.log(`longDiff: ${lonDiff}`);

        if (latDiff < PROXIMITY_THRESHOLD && lonDiff < PROXIMITY_THRESHOLD) {
          try {
            await updateSaleStatus(sale.saleId, 'COMPLETED');
            console.log(`Sale ID ${sale.saleId} marked as COMPLETED.`);
            completedSaleIds.add(sale.saleId);
          } catch (err) {
            console.error(`Failed to update status for Sale ID ${sale.saleId}:`, err);
          }
        }
      }

      index++;
    } else {
      clearInterval(interval);
      console.log('Simulation complete.');
      try {
        await completeRoute(routeId);
        console.log(`Route ID ${routeId} marked as COMPLETED.`);
      } catch (err) {
        console.error(`Failed to complete Route ID ${routeId}:`, err);
      }
    }
  }, 1000); // Update every 1 second
}