// Module imports
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import JwtDecode from "jwt-decode";
import Axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
// MUI theme provider
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Local imports
import "./App.css";
import globalTheme from "./utils/theme";

// Components
import Navbar from "./components/layout/Navbar";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./utils/AuthRoute";
import { getUserData, logoutUser } from "./redux/actions/userActions";
import { persistor } from "./redux/store";
import UserPage from "./pages/UserPage";
import { getScreams } from "./redux/actions/dataActions";

const theme = createMuiTheme(globalTheme);

Axios.defaults.baseURL =
  "https://asia-east2-trustbook-c2b3d.cloudfunctions.net/api";

function App() {
  const dispatch = useDispatch();
  console.log("rendered");
  useEffect(() => {
    const token = localStorage.FirebaseIdToken;
    if (token) {
      const decodedToken = JwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
      } else {
        Axios.defaults.headers.common["Authorization"] = token;
        dispatch(getUserData());
      }
    }
    dispatch(getScreams());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <PersistGate persistor={persistor}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <AuthRoute exact path="/login" component={LoginPage} />
              <AuthRoute exact path="/register" component={RegisterPage} />
              <Route exact path="/user/:handle" component={UserPage} />
              <Route
                exact
                path="/user/:handle/scream/:screamId"
                component={UserPage}
              />
            </Switch>
          </div>
        </PersistGate>
      </Router>
    </ThemeProvider>
  );
}

export default App;
