const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const {
  generateMessage,
  generateLocationMessage
} = require('./utils/messages');
const Filters = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicPathDirectory = path.join(__dirname, '../public');

app.use(express.static(publicPathDirectory));

io.on('connection', socket => {
  console.log('new WebSocket connection.');

  socket.on('join', ({ username, room }) => {
    socket.join(room);
    socket.emit('message', generateMessage('Welcome!'));
    socket.broadcast
      .to(room)
      .emit('message', generateMessage(`${username} has joined!`));
  });

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filters();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!');
    }

    io.emit('message', generateMessage(message));
    callback();
  });

  socket.on('sendLocation', (coords, callback) => {
    io.emit(
      'locationMessage',
      generateLocationMessage(
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
