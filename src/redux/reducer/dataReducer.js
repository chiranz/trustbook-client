import {
  SET_SCREAMS,
  LOADING_SCREAMS,
  LIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  loading: false,
  screams: [],
  scream: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCREAMS:
      return { ...state, loading: false, screams: action.payload };
    case LOADING_SCREAMS:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
      const index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      return { ...state, scream: action.payload };
    case DELETE_SCREAM:
      const screams = state.screams.filter(
        (scream) => action.payload !== scream.screamId
      );

      return {
        ...state,
        screams,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    default:
      return state;
  }
}
