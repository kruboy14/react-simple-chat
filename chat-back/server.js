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

app.get('/rooms/:id', (req, res) => {
  const { id: roomID } = req.params;
  const obj = rooms.has(roomID)
    ? {
        users: [...rooms.get(roomID).get('users').values()],
        messages: [...rooms.get(roomID).get('messages').values()],
      }
    : {
        users: [],
        messages: [],
      };
  res.json(obj);
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
  socket.on('ROOM:JOIN', ({ roomID, username }) => {
    socket.join(roomID);
    rooms.get(roomID).get('users').set(socket.id, username);
    const users = [...rooms.get(roomID).get('users').values()];
    socket.to(roomID).emit('ROOM:SET_USERS', users);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ roomID, username, text }) => {
    const obj = { username, text };
    rooms.get(roomID).get('messages').push(obj);
    socket.to(roomID).emit('ROOM:NEW_MESSAGE', obj);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomID) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        socket.broadcast.to(roomID).emit('ROOM:SET_USERS', users);
      }
    });
  });
  console.log('socket connected', socket.id);
});

server.listen(9999, (err) => {
  if (err) throw Error(err);
  console.log('Server is up');
});
