import { SET_SCREAMS, LOADING_SCREAMS, LIKE_SCREAM } from "../types";

const initialState = {
  loading: false,
  screams: [],
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
    case LIKE_SCREAM:
      const index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      return { ...state };
    default:
      return state;
  }
}
