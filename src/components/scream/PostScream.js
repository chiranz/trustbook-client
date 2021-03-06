// Module import
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// Local imports
import { useDispatch } from "react-redux";
import { createScream } from "../../redux/actions/dataActions";
// MUI import
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import AddIcon from "@material-ui/icons/Add";
import DialogActions from "@material-ui/core/DialogActions";
// Local imports
import MyButton from "../MyButton";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    marginTop: "1rem",
    position: "relative",
  },

  progress: {
    position: "absolute",
  },
}));

function PostScream() {
  const dispatch = useDispatch();
  const [scream, setScream] = useState("");
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(280);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const handleCreate = () => {
    if (scream.trim() !== "") {
      const actions = { setLoading, setOpen, setScream, setError };
      setLoading(true);
      dispatch(createScream({ body: scream }, actions));
    } else {
      setError("Can't be empty!");
    }
  };
  const handleChange = (e) => {
    setError("");
    setCharCount(280 - e.target.value.length);
    if (charCount <= 0) {
      return;
    }
    setScream(e.target.value);
  };
  const charHelper =
    charCount > 0
      ? `${charCount} character's left`
      : "Character limit exceeded";
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
              label="Scream"
              placeholder="scream at your friends"
              className={classes.textField}
              value={scream}
              onChange={handleChange}
              error={error ? true : false}
              helperText={error || charHelper}
              fullWidth
              multiline
              rows={4}
              autoFocus
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            disabled={loading}
          >
            Post
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

export default PostScream;
