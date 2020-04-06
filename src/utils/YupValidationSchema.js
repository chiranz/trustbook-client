import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255, "Should be less than 255 characters")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Shoul be min 6 characters")
    .max(255, "Can't be more than 255 chars")
    .required("Password is required!"),
});

export const registerValidationSchema = Yup.object().shape({
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
