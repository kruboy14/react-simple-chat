const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/rooms', (req, res) => {
  const { roomID, username } = req.body;
  if (!rooms.has(roomID)) {
    rooms.set(
      roomID,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }
  res.send();
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({roomID}) => {
    socket.join(roomID);
    rooms.get(roomID).get('users')
  });

  console.log('socket connected', socket.id);
});

server.listen(9999, (err) => {
  if (err) throw Error(err);
  console.log('Server is up');
});
