import React, { useState } from "react";
// Local imports
import { withStyles } from "@material-ui/core";
import MyButton from "../MyButton";
import { deleteScream } from "../../redux/actions/dataActions";
import { useDispatch } from "react-redux";
// MUI imports
import DeleteForever from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
  },
  button: {
    marginTop: "1rem",
    position: "relative",
  },

  progress: {
    position: "absolute",
  },
};

function DeleteButton({ screamId, classes }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteScream(screamId, setOpen, setLoading));
  };

  return (
    <>
      <MyButton
        btnClassName={classes.deleteButton}
        handleClick={() => setOpen(true)}
        title="Delete"
      >
        <DeleteForever color="secondary" />
      </MyButton>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Are you sure to delete this scream?</DialogTitle>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button color="secondary" onClick={handleDelete} disabled={loading}>
            <DeleteOutline />
            Delete
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

export default withStyles(styles)(DeleteButton);
