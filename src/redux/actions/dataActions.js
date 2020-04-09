import Axios from "axios";
import {
  LOADING_SCREAMS,
  SET_SCREAMS,
  DELETE_SCREAM,
  LIKE_SCREAM,
  POST_SCREAM,
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

// Delete a scream
export const deleteScream = (screamId, setOpen, setLoading) => async (
  dispatch
) => {
  await Axios.delete(`/screams/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      });
    })
    .catch((err) => console.log(err));
  setLoading(false);
  setOpen(false);
};

export const createScream = (
  scream,
  { setLoading, setOpen, setScream, setError }
) => async (dispatch) => {
  await Axios.post("/scream", scream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      setOpen(false);
      setScream("");
    })
    .catch((err) => {
      setError("Post scream failed!");
      console.log(err);
    });
  setLoading(false);
};
