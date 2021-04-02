import React from 'react';
import socket from '../socket';

function Chat({ users, messages, username, roomID, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    console.log('onSendMessage');
    socket.emit('ROOM:NEW_MESSAGE', {
      roomID,
      username,
      text: messageValue,
    });
    onAddMessage({
      username,
      text: messageValue,
    });
    setMessageValue('');
  };

  React.useEffect(() => {
    const scrollHeight = messagesRef.current.scrollHeight;
    messagesRef.current.scrollTo(0, scrollHeight);
  }, [messages]);

  
  return (
    <div className="chat">
      <div className="chat-users">
        Room: <b>{roomID}</b>
        <hr />
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message) => (
             
            <div className={`message ${message.username === username ? "myMessage" : ""}`}>
            
              <p>{message.text}</p>
              <div>
                <span>{message.username}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <button
            onClick={onSendMessage}
            type="button"
            className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
