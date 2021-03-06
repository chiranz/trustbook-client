import React, { useState } from "react";

// Module Imports
import { Formik } from "formik";
import { Link } from "react-router-dom";

// MUI imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Local imports
import TrustImg from "../assets/trust.svg";
import { registerValidationSchema } from "../utils/YupValidationSchema";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  ...theme.formStyles,
}));

function RegisterPage({ history }) {
  const [globalError, setGlobalError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    dispatch(
      signupUser({
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
          Sign Up
        </Typography>
        <Typography variant="body2" color="error">
          {globalError}
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            handle: "",
            confirmPassword: "",
          }}
          validationSchema={registerValidationSchema}
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
                id="handle"
                name="handle"
                type="handle"
                label="Handle"
                className={classes.textField}
                value={values.handle}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.handle && touched.handle ? true : false}
                helperText={errors.handle}
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
                  errors.confirmPassword && touched.confirmPassword
                    ? true
                    : false
                }
                helperText={errors.confirmPassword}
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

export default RegisterPage;
