import { broadcastBotPosition } from './websocket.js';
import { completeRoute } from './database.js';

export function simulateBotMovement(routeData, routeId) {
  const coordinates = routeData.trips[0].geometry.coordinates;
  let index = 0;

  const interval = setInterval(() => {
    if (index < coordinates.length) {
      const currentPosition = coordinates[index];
      // Broadcast the current position to clients
      broadcastBotPosition(currentPosition);
      index++;
    } else {
      clearInterval(interval);
      console.log('Simulation complete.');
      completeRoute(routeId);
    }
  }, 1000); // Update every 1 second
}