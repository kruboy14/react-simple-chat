import React from 'react';
import axios from 'axios';
import socket from '../socket';

function JoinBlock() {
  const [roomID, setRoomID] = React.useState('');
  const [username, setUsername] = React.useState('');

  const onEnter = () => {
    if (!roomID || !username) {
      return alert('Incorrect Data');
    }
    axios.post('/rooms', {
      roomID,
      username
    })
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={onEnter} className="btn btn-success">
        Enter
      </button>
    </div>
  );
}

export default JoinBlock;
