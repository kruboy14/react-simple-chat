import React from 'react';
import axios from 'axios';

import socket from './socket';
import JoinBlock from './components/JoinBlock';
import { JOINED, NEW_MESSAGE, SET_DATA, SET_USERS } from './constants';
import reducer from './reducer';
import Chat from './components/Chat';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomID: null,
    username: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: JOINED,
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomID}`);
    dispatch({ type: SET_DATA, payload: data });
  };

  const addMessage = (message) => {
    dispatch({ type: NEW_MESSAGE, payload:message });
  };

  React.useEffect(() => {
    const setUsers = (users) => {
      dispatch({ type: SET_USERS, payload: users });
    };
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  return (
    <div className="wrapper">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} onAddMessage={addMessage} />}
    </div>
  );
}

export default App;
