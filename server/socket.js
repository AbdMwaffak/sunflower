// Yes, you can implement real-time notifications without
// using Firebase by using WebSockets or a service like Pusher.
// Here’s how you can implement it using WebSockets with Socket.IO,
// a popular library for real-time web applications.

// ### Step-by-Step Guide with Socket.IO

// #### 1. Set Up Your Environment
// Ensure you have the following technologies set up in your MERN stack:
// - **MongoDB**: For storing data
// - **Express**: For the backend
// - **React**: For the frontend
// - **Node.js**: Server-side JavaScript
// - **Socket.IO**: For real-time communication

// #### 2. Install Dependencies

// Install the necessary packages for both the server and client.

// ```bash
// # Server-side dependencies
// npm install express socket.io mongoose

// # Client-side dependencies
// npm install socket.io-client
// ```

// #### 3. Set Up the Server

// Create a basic Express server with Socket.IO integrated.

// ```javascript
// // server/index.js


// BACKEND
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Order Schema
const orderSchema = new mongoose.Schema({
  details: String,
  // Other fields
});

const Order = mongoose.model('Order', orderSchema);

// Middleware to parse JSON requests
app.use(express.json());

// Handle new order submissions
app.post('/orders', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();

  // Emit the new order event to all connected clients
  io.emit('newOrder', newOrder);

  res.status(201).send(newOrder);
});

// Set up a basic server route
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//  ----------CLIENT-----------

// #### 4. Set Up the Client

// Configure the client to connect to the server and handle real-time updates.

// ##### Client Side (User Submitting Order)
// ```javascript
// // src/App.js

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [order, setOrder] = useState({
    // Your order fields
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/orders', order);
    // Additional logic if needed
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit">Submit Order</button>
    </form>
  );
};



// ##### Client Side (Admin Receiving Notifications)
// ```javascript
// // src/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on('newOrder', (order) => {
      setOrders((prevOrders) => [...prevOrders, order]);
    });

    return () => {
      socket.off('newOrder');
    };
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>{order.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
