import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// Mui Imports
import { withStyles, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiLink from "@material-ui/core/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// Local Imports
import { uploadProfileImage, logoutUser } from "../redux/actions/userActions";
import EditDetails from "./EditDetails";
import MyButton from "./MyButton";

const styles = (theme) => ({
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
        color: theme.palette.primary.main,
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
});

function Profile({ classes }) {
  const dispatch = useDispatch();

  const fileRef = useRef();
  const handleImageChange = (e) => {
    console.log("clicked");
    const userImage = e.target.files[0];
    const formData = new FormData();
    formData.append("image", userImage, userImage.name);
    dispatch(uploadProfileImage(formData));
  };

  const {
    authenticated,
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
  } = useSelector((state) => state.user);
  const profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              ref={fileRef}
              type="file"
              name="profile_pic"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <MyButton
              title="Edit profile picture"
              btnClassName="button"
              handleClick={() => fileRef.current.click()}
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`users/${handle}`}
              variant="h5"
              color="inherit"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && (
              <>
                <Typography variant="body2">{bio}</Typography>
                <hr />
              </>
            )}
            {location && (
              <>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <MyButton title="Logout" handleClick={() => dispatch(logoutUser())}>
            <ExitToAppIcon className={classes.logoutRotate} color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography align="center" variant="body2">
          No Profile found, please login
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <div className={classes.progress}>
      <CircularProgress size={30} />
    </div>
  );

  return profileMarkup;
}

export default withStyles(styles)(Profile);
