import { JOINED, SET_USERS, NEW_MESSAGE, SET_DATA } from './constants';

export default function reducer(state, action) {
  switch (action.type) {
    case JOINED:
      return {
        ...state,
        joined: true,
        roomID: action.payload.roomID,
        username: action.payload.username,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

      case SET_DATA:
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages
      };

    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
}
