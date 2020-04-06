import React from "react";
import { Link } from "react-router-dom";

// MUI Imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

export default function Navbar() {
  const { authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const authRoutes = (
    <>
      <Button color="inherit" component={Link} to="/user">
        User
      </Button>

      <Button color="inherit" onClick={() => dispatch(logoutUser())}>
        Logout
      </Button>
    </>
  );
  const guestRoutes = (
    <>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>

      <Button color="inherit" component={Link} to="/register">
        Register
      </Button>
    </>
  );

  return (
    <AppBar>
      <Toolbar className="nav-container">
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {authenticated ? authRoutes : guestRoutes}
      </Toolbar>
    </AppBar>
  );
}
