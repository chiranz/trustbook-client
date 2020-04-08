// Module import
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";
// Local imports
import { useDispatch } from "react-redux";
import { createScream } from "../redux/actions/dataActions";
// MUI import
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import AddIcon from "@material-ui/icons/Add";
import DialogActions from "@material-ui/core/DialogActions";
// Local imports
import MyButton from "./MyButton";

const styles = {
  button: {
    marginTop: "1rem",
    position: "relative",
  },

  progress: {
    position: "absolute",
  },
};

function PostScream({ classes }) {
  const dispatch = useDispatch();
  const [scream, setScream] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    if (scream.trim() !== "") {
      setLoading(true);
      dispatch(createScream({ body: scream }, setLoading, setOpen));
    } else {
      setError("Can't be empty!");
    }
  };
  return (
    <>
      <MyButton title="Post a scream" handleClick={() => setOpen(true)}>
        <AddIcon />
      </MyButton>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Post a Scream</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="scream"
              name="scream"
              type="scream"
              label="Post a scream"
              className={classes.textField}
              value={scream}
              onChange={(e) => setScream(e.target.value)}
              error={error ? true : false}
              helperText={error}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="primary" onClick={handleCreate}>
            Create
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

export default withStyles(styles)(PostScream);
