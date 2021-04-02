import React from 'react';
import socket from '../socket';

function Chat({ users, messages }) {
  const [messageValue, setMessageValue] = React.useState('');

  return (
    <div className="chat">
      <div className="chat-users">
        Room: <b>1</b>
        <hr />
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
          <div className="message">
            <p>fsafds</p>
          </div>
          <div className="message">
            <p>fsafds</p>
          </div>
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <button type="button" className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
