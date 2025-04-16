const sseClients = {
  admin: [], // Clients for admin interface
};

// Middleware to handle SSE connections for admin
exports.sseHandler = (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Can restrict this to specific domain in production
  res.flushHeaders();

  // Add the admin client to the list
  const clientType = 'admin'; // Default to admin role
  if (!sseClients[clientType]) sseClients[clientType] = [];
  sseClients[clientType].push(res);

  // Send a connection acknowledgment
  res.write(`data: ${JSON.stringify({ message: 'Connected to SSE' })}\n\n`);

  const pingInterval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ message: 'ping' })}\n\n`);
  }, 15000); // 15 seconds

  // Cleanup on client disconnect
  req.on('close', () => {
    clearInterval(pingInterval); // Clear the ping interval on disconnect
    const index = sseClients[clientType].indexOf(res);
    if (index !== -1) sseClients[clientType].splice(index, 1);
    res.end();
  });
};

// Function to broadcast data to a specific group of SSE clients
exports.broadcastSSE = (role, data) => {
  if (!sseClients[role]) return;
  sseClients[role].forEach((client, index) => {
    if (client.readyState === client.OPEN)
      client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};
