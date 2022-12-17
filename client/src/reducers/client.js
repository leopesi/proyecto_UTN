//set/clear message
import { CLIENT_ID_SUCCESS } from "../actions/types";

const initialState = {};

export default function clientId(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLIENT_ID_SUCCESS:
      return { 
        ...state,
        id: payload.id };
    default:
      return state;
  }
}





