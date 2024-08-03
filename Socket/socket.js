const socket = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: ["http://localhost:5000"],
    methods: ['GET', 'POST'],
  },
});

const connections = [];

io.sockets.on('connection', (socket) => {
  connections.push(socket);
  console.log('%s sockets are connected', connections.length);

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('%s sockets are connected', connections.length);
  });

  // Example of sending a message to the client
  const jsonobj = { message: 'Welcome to the server!' };
  socket.emit('server message', jsonobj);
});

module.exports = { app, io, server };
