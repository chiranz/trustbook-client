import { SET_USER, SET_UNAUTHENTICATED } from "../types";
import Axios from "axios";

const setAuthorizationHeader = (token) => {
  const firebaseIdToken = `Bearer ${token}`;
  localStorage.setItem("FirebaseIdToken", firebaseIdToken);
  Axios.defaults.headers.common["Authorization"] = firebaseIdToken;
};

export const loginUser = ({
  userData,
  history,
  setSubmitting,
  setErrors,
  resetForm,
  setGlobalError,
}) => async (dispatch) => {
  setSubmitting(true);
  await Axios.post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      resetForm();
      setSubmitting(false);
      history.push("/");
    })
    .catch((err) => {
      const errors = err.response.data;
      if (errors.global) {
        setGlobalError(errors.global);
      }
      setSubmitting(false);
      setErrors(errors);
    });
};
export const signupUser = ({
  userData,
  history,
  setSubmitting,
  setErrors,
  resetForm,
  setGlobalError,
}) => async (dispatch) => {
  setSubmitting(true);
  await Axios.post("/signup", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      resetForm();
      setSubmitting(false);
      history.push("/");
    })
    .catch((err) => {
      const errors = err.response.data;
      if (errors.global) {
        setGlobalError(errors.global);
      }
      setSubmitting(false);
      setErrors(errors);
    });
};

export const getUserData = () => async (dispatch) => {
  await Axios.get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FirebaseIdToken");
  delete Axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};
