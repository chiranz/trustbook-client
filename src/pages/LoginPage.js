import React, { useState } from "react";

// Module Imports
import { Formik } from "formik";
import { Link } from "react-router-dom";

// MUI imports
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Local imports
import TrustImg from "../assets/trust.svg";
import { loginValidationSchema } from "../utils/YupValidationSchema";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ...theme.formStyles,
}));

function LoginPage({ history }) {
  const [globalError, setGlobalError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    dispatch(
      loginUser({
        userData: values,
        history,
        setSubmitting,
        setErrors,
        resetForm,
        setGlobalError,
      })
    );
  };
  const classes = useStyles();
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img className={classes.image} src={TrustImg} alt="Trust" />
        <Typography variant="h5" className={classes.pageTitle}>
          Login
        </Typography>
        <Typography variant="body2" color="error">
          {globalError && globalError}
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
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
                error={errors.email && touched.email ? true : false}
                helperText={errors.email}
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
                error={errors.password && touched.password ? true : false}
                helperText={errors.password}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={isSubmitting}
              >
                Login
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
            Don't have an account? register <Link to="/register">here</Link>
          </small>
        </Typography>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default LoginPage;
