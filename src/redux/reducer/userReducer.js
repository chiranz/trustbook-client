import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        ...action.payload,
      };

    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };

    case SET_UNAUTHENTICATED:
      return initialState;

    case LOADING_USER:
      return { ...state, loading: true };
    case LIKE_SCREAM:
      const isLiked = state.likes.find(
        (like) => like.screamId === action.payload.screamId
      );

      if (isLiked) {
        let likes = state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        );
        return {
          ...state,
          likes: [...likes],
        };
      } else {
        return {
          ...state,
          likes: [
            ...state.likes,
            {
              userHandle: state.credentials.handle,
              screamId: action.payload.screamId,
            },
          ],
        };
      }
    default:
      return state;
  }
}
