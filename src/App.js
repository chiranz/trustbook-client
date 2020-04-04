import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// MUI theme provider
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// Components
import Navbar from "./components/Navbar";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ffcd00",
      dark: "#b22a00",
      contrastText: "#ffffff",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
