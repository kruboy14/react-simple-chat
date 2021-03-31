import io from 'socket.io-client';

const socket = io('http://localhost:9999');

function App() {
  return (
    <div className="wrapper">
      <div className="join-block">
        <input type="text" placeholder="Room ID"  />
        <input type="text" placeholder="Your name"  />
        <button className="btn btn-success">Enter</button>
      </div>
    </div>
  );
}

export default App;
