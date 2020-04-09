import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
// Mui Imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
// Local Imports
import { editUserDetails } from "../redux/actions/userActions";

const styles = (theme) => ({
  button: {
    float: "right",
    position: "relative",
    marginTop: "1rem",
  },
  textField: {
    width: "100%",
    marginTop: "1rem",
  },

  progress: {
    position: "absolute",
  },
});

function EditDetails({ classes }) {
  const { credentials } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [website, setWebsite] = useState("");
  useEffect(() => {
    if (Object.values(credentials).length) {
      setBio(credentials.bio ? credentials.bio : "");
      setLocation(credentials.location ? credentials.location : "");
      setWebsite(credentials.website ? credentials.website : "");
    }
  }, [credentials]);
  const handleSubmit = () => {
    setLoading(true);
    const userDetails = { bio, location, website };
    dispatch(editUserDetails(userDetails, setLoading, setOpen));
  };

  return (
    <>
      <Tooltip title="Edit Profile" placement="top">
        <IconButton className={classes.button} onClick={() => setOpen(true)}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullwidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details.</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              fullwidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              fullwidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your website"
              className={classes.textField}
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
              fullwidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disabled={loading}
          >
            Save
            {loading ? (
              <CircularProgress size={30} className={classes.progress} />
            ) : (
              ""
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(EditDetails);
