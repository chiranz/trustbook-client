import { SCREAMS_LOADED, LOADING_SCREAMS } from "../types";

const initialState = {
  loading: false,
  screams: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SCREAMS_LOADED:
      return { ...state, loading: false, screams: action.payload };
    case LOADING_SCREAMS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
