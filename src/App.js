// Module imports
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

const theme = createMuiTheme(globalTheme);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <AuthRoute exact path="/login" component={LoginPage} />
              <AuthRoute exact path="/register" component={RegisterPage} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
