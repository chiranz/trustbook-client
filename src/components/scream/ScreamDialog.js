// Module import
import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// Local imports
import { useDispatch, useSelector } from "react-redux";
import { getScream } from "../../redux/actions/dataActions";
// MUI import
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
// Local imports
import MyButton from "../MyButton";
import CenteredLoading from "../CenteredLoading";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = {
  button: {
    marginTop: "1rem",
    position: "relative",
  },

  progress: {
    position: "absolute",
  },
  invisibleSeperator: {
    border: "none",
    margin: 4,
  },
  visibleSeperator: {
    marginBottom: 20,
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
};

function ScreamDialog({ classes, screamId }) {
  const {
    data: { scream },
    user: { authenticated },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    const actions = { setLoading };
    setLoading(true);
    setOpen(true);
    dispatch(getScream(screamId, actions));
  };

  return (
    <>
      <MyButton
        title="Expand scream"
        tipClassName={classes.expandButton}
        handleClick={handleOpen}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <MyButton
          title="Close"
          handleClick={() => setOpen(false)}
          btnClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {loading ? (
            <CenteredLoading size={100} />
          ) : (
            <Grid container spacing={16}>
              <Grid item sm={5}>
                <img
                  src={scream && scream.userImage}
                  alt="profile"
                  className={classes.profileImage}
                />
              </Grid>
              <Grid item sm={7}>
                <Typography
                  component={Link}
                  color="primary"
                  variant="h5"
                  to={`/users/${scream && scream.userHandle}`}
                >
                  @{scream && scream.userHandle}
                </Typography>
                <hr className={classes.invisibleSeperator} />
                <Typography variant="body2" color="textSecondary">
                  {dayjs(scream && scream.createdAt).format(
                    "h:mm a, MMM DD YYYY"
                  )}
                </Typography>
                <hr className={classes.invisibleSeperator} />
                <Typography variant="body1">{scream && scream.body}</Typography>

                <LikeButton screamId={scream.screamId} />
                <span>{scream.likeCount} likes</span>

                <MyButton title="comments">
                  <ChatIcon color="primary" />
                </MyButton>
                <span>{scream.commentCount} comments</span>
              </Grid>
              <hr className={classes.visibleSeperator} />
              {authenticated && <CommentForm screamId={scream.screamId} />}
              <Comments comments={scream.comments} />
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(ScreamDialog);
