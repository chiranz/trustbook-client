export default {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#ffffff",
    },
  },
  spreadThis: {
    paper: {
      padding: 20,
    },
    logoutRotate: {
      transform: "rotate(-90deg)",
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& .button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#00bcd4",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
    progress: {
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      marginTop: "3rem",
    },
  },
  formStyles: {
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
  },
};
