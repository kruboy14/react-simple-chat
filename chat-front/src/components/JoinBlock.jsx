import React from 'react';
import axios from 'axios';

function JoinBlock({ onLogin }) {
  const [roomID, setRoomID] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomID || !username) {
      return alert('Incorrect Data');
    }
    const obj = {
      roomID,
      username,
    };
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
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
        {isLoading ? 'Loading...' : 'Enter'}
      </button>
    </div>
  );
}

export default JoinBlock;
