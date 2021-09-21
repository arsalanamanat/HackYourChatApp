const { formatMessage, joinUser, getCurrentUser, getRoomUsers, userLeave } = require('./Utils/User');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
   cors: { origin: ['http://localhost:3000'] },
});

io.on('connection', (socket) => {
   socket.on('joinRoom', ({ username, room, profileImage }) => {
      const user = joinUser(socket.id, username, room, profileImage);

      socket.join(user.room);
      socket.emit('message', formatMessage('Bot', `${user.username} Welcome to the Chat`));

      socket.broadcast.to(user.room).emit('message', formatMessage('Bot', `${user.username} has Joined the Chat`));

      socket.on('chatMessage', (message) => {
         const user = getCurrentUser(socket.id);
         io.to(user.room).emit('message', formatMessage(user.username, message));
      });

      io.to(user.room).emit('roomUsers', {
         room: user.room,
         users: getRoomUsers(user.room),
      });
   });

   socket.on('userLeft', () => {
      const user = userLeave(socket.id);
      if (user) {
         socket.disconnect();
         io.to(user.room).emit('message', formatMessage('Bot', ` ${user.username} left the chat:`));
         io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room),
         });
      }
   });

   socket.on('disconnect', () => {
      const user = userLeave(socket.id);
      if (user) {
         socket.disconnect();
         io.to(user.room).emit('message', formatMessage('Bot', ` ${user.username} left the chat:`));
         io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room),
         });
      }
   });
});

server.listen(5000 || process.env.PORT);
