// Module imports
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import JwtDecode from "jwt-decode";
import Axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
// MUI theme provider
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Local imports
import "./App.css";
import globalTheme from "./utils/theme";

// Components
import Navbar from "./components/Navbar";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./utils/AuthRoute";
import { getUserData, logoutUser } from "./redux/actions/userActions";
import { getScreams } from "./redux/actions/dataActions";
import { persistor } from "./redux/store";

const theme = createMuiTheme(globalTheme);

function App() {
  const dispatch = useDispatch();
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
    <MuiThemeProvider theme={theme}>
      <Router>
        <PersistGate persistor={persistor}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <AuthRoute exact path="/login" component={LoginPage} />
              <AuthRoute exact path="/register" component={RegisterPage} />
            </Switch>
          </div>
        </PersistGate>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
