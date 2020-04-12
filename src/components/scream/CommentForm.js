import React, { useState } from "react";
import { useDispatch } from "react-redux";

// MUI Textfield
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

// Local Imports
import { submitComment } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    marginTop: "1rem",
    position: "relative",
    left: "40%",
  },
  progress: {
    position: "absolute",
  },
  visibleSeperator: {
    marginBottom: 20,
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  },
}));

function CommentForm({ screamId }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      setError("Comment can't be empty");
    } else {
      const actions = { setLoading, setComment };
      setLoading(true);
      dispatch(submitComment(screamId, { body: comment }, actions));
    }
  };
  const handleChange = (e) => {
    setError("");
    setComment(e.target.value);
  };
  const classes = useStyles();
  return (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="comment"
          name="comment"
          type="comment"
          label="Comment"
          placeholder="Comment at this post"
          className={classes.textField}
          value={comment}
          error={error}
          helperText={error}
          onChange={handleChange}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          className={classes.button}
        >
          Post
          {loading ? (
            <CircularProgress size={30} className={classes.progress} />
          ) : (
            ""
          )}
        </Button>
      </form>
      <hr className={classes.visibleSeperator} />
    </Grid>
  );
}

export default CommentForm;
