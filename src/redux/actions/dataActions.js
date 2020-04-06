import Axios from "axios";
import { LOADING_SCREAMS, SCREAMS_LOADED } from "../types";

export const getScreams = () => async (dispatch) => {
  dispatch({
    type: LOADING_SCREAMS,
  });
  await Axios.get("/screams")
    .then((res) => {
      dispatch({
        type: SCREAMS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
