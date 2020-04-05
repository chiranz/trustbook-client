import React from "react";
import { Route, Redirect } from "react-router-dom";
import JwtDecode from "jwt-decode";

export default function AuthRoute({ component: Component, ...rest }) {
  let authenticated;
  const token = localStorage.FirebaseIdToken;
  if (token) {
    const decodedToken = JwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      authenticated = false;
    } else {
      authenticated = true;
    }
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
