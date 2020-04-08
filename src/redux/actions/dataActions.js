import Axios from "axios";
import {
  LOADING_SCREAMS,
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
} from "../types";

export const getScreams = () => async (dispatch) => {
  dispatch({
    type: LOADING_SCREAMS,
  });
  await Axios.get("/screams")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

// Like a scream
export const likeScream = (screamId) => async (dispatch) => {
  await Axios.get(`/screams/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
