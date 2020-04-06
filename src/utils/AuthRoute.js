import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRoute({ component: Component, ...rest }) {
  const { authenticated } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
