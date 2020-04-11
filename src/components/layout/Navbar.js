import React from "react";
import { Link } from "react-router-dom";

// MUI Imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
// Local Imports
import MyButton from "../MyButton";

// MUI imports
import HomeIcon from "@material-ui/icons/Home";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";

export default function Navbar() {
  const { authenticated } = useSelector((state) => state.user);
  const authRoutes = (
    <>
      <PostScream />
      <Link to="/">
        <MyButton title="Home">
          <HomeIcon />
        </MyButton>
      </Link>
      <Notifications />
    </>
  );
  const guestRoutes = (
    <>
      <Link to="/">
        <MyButton title="Home">
          <HomeIcon />
        </MyButton>
      </Link>
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
        {authenticated ? authRoutes : guestRoutes}
      </Toolbar>
    </AppBar>
  );
}
