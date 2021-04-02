import { JOINED, SET_USERS, SET_MESSAGES } from './constants';

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
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
}
