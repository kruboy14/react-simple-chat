import io from 'socket.io-client';

const socket = io('https://react-simple-chat-back-heroku.herokuapp.com/');

export default socket;
