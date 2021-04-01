import React from 'react';

import socket from './socket';
import JoinBlock from './components/JoinBlock';
import { JOINED } from './constants';
import reducer from './reducer';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomID: null,
    username: null,
  });

  const onLogin = (obj) => {
    dispatch({
      type: JOINED,
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
  };

  console.log(state);

  return (
    <div className="wrapper">
      {!state.joined && <JoinBlock onLogin={onLogin} />}
    </div>
  );
}

export default App;
