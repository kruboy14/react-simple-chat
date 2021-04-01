import { JOINED } from "./constants";

export default function reducer(state, action) {
  switch (action.type) {
    case JOINED:
      return {
        ...state,
        joined: true,
        roomID: action.payload.roomID,
        username: action.payload.username,
      };

    default:
      return state;
  }
}
