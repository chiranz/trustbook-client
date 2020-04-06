import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        ...action.payload,
      };
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };
    case SET_UNAUTHENTICATED:
      return initialState;
    default:
      return state;
  }
}
