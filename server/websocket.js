import WebSocket, { WebSocketServer } from 'ws';

// Initialize WebSocket server on port 8082
const wss = new WebSocketServer({ port: 8082 });

// Set to keep track of connected clients
const clients = new Set();

// Variable to store the current route data
let currentRoute = null;

// Handle new client connections
wss.on('connection', (ws, req) => {
  // Parse query parameters to get the role
  const parameters = new URLSearchParams(req.url.replace('/?', ''));
  const role = parameters.get('role') || 'customer';
  ws.role = role;

  console.log('Client connected with role:', role);
  clients.add(ws);

  // If there's an existing route, send it to the newly connected client
  if (currentRoute) {
    const message = JSON.stringify({ type: 'route_update', data: currentRoute });
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      console.log(`Sent current route to new client: ${message}`);
    }
  }

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  // Handle client errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// Function to broadcast route data and update currentRoute
export function broadcastRouteData(routeData) {
  const message = JSON.stringify({ type: 'route_update', data: routeData });

  // Update the currentRoute with the latest data
  currentRoute = routeData;

  // Broadcast the message to all connected clients
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      console.log(`Message sent: ${message}`);
    }
  }
}

// Function to broadcast bot position to all connected clients
export function broadcastBotPosition(position) {
    const message = JSON.stringify({ type: 'bot_position', data: { position } });

    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
            console.log(`Bot position sent to client: ${message}`);
        }
    }
}

console.log('WebSocket server is running on ws://localhost:8082');