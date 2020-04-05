import React, { useState } from "react";

// Module Imports
import Axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";

// MUI imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Local imports
import TrustImg from "../assets/trust.svg";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    width: "30px",
    margin: "1rem auto",
  },
  textField: {
    marginTop: "1rem",
  },
  button: {
    marginTop: "1rem  ",
    position: "relative",
  },
  pageTitle: {
    margin: "0.5rem auto",
  },
  progress: {
    position: "absolute",
  },
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255, "Should be less than 255 characters")
    .required("Email is required!"),
  handle: Yup.string()
    .min(2, "Should be at least 2 characters")
    .max(255, "Should be less than 255 characters")
    .required("Handle is required!"),
  password: Yup.string()
    .min(6, "Should be min 6 characters")
    .max(255, "Can't be more than 255 chars")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .min(6, "Should be min 6 characters")
    .max(255, "Can't be more than 255 chars")
    .required("Confirm your password!")
    .test("match-password", "Passwords must be same.", function (value) {
      return value === this.parent.password;
    }),
});

function RegisterPage({ classes, history }) {
  const [authErrors, setAuthErrors] = useState({});

  const handleSubmit = async (userData) => {
    return await Axios.post("/signup", userData)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setAuthErrors(err.response.data);
      });
  };
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img className={classes.image} src={TrustImg} alt="Trust" />
        <Typography variant="h5" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <Typography variant="body2" color="error">
          {authErrors.global}
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            handle: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            handleSubmit(values).then(() => {
              resetForm();
              setSubmitting(false);
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  authErrors.email || (errors.email && touched.email)
                    ? true
                    : false
                }
                helperText={errors.email || authErrors.email}
                fullWidth
              />
              <TextField
                id="handle"
                name="handle"
                type="handle"
                label="Handle"
                className={classes.textField}
                value={values.handle}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  authErrors.handle || (errors.handle && touched.handle)
                    ? true
                    : false
                }
                helperText={errors.handle || authErrors.handle}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  authErrors.password || (errors.password && touched.password)
                    ? true
                    : false
                }
                helperText={errors.password || authErrors.password}
                fullWidth
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                className={classes.textField}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  authErrors.confirmPassword ||
                  (errors.confirmPassword && touched.confirmPassword)
                    ? true
                    : false
                }
                helperText={
                  errors.confirmPassword || authErrors.confirmPassword
                }
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={isSubmitting}
              >
                Sign Up
                {isSubmitting ? (
                  <CircularProgress size={30} className={classes.progress} />
                ) : (
                  ""
                )}
              </Button>
            </form>
          )}
        </Formik>
        <Typography color="textSecondary">
          <small>
            Already have an account? login <Link to="/login">here</Link>
          </small>
        </Typography>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default withStyles(styles)(RegisterPage);
