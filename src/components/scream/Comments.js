import React, { Fragment, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import dayjs from "dayjs";

// Mui import
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  visibleSeperator: {
    marginBottom: 20,
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  },
  invisibleSeperator: {
    border: "none",
    margin: 4,
  },
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
});

function Comments(props) {
  const { classes } = props;
  const [comments, setComment] = useState([]);
  useEffect(() => {
    if (props.comments) {
      setComment(props.comments);
    }
  }, [props.comments]);
  return (
    <Grid container>
      {comments.map(({ body, createdAt, userHandle, userImage }, index) => {
        return (
          <Fragment key={index}>
            <Grid container>
              <Grid sm={2} item>
                <img
                  src={userImage}
                  alt="Profile"
                  className={classes.commentImage}
                />
              </Grid>
              <Grid sm={9}>
                <div className={classes.commentData}>
                  <Typography
                    to={`/users/${userHandle}`}
                    component={Link}
                    variant="h5"
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                  </Typography>
                  <hr className={classes.invisibleSeperator} />
                  <Typography variant="body1">{body}</Typography>
                </div>
              </Grid>
            </Grid>
            {index < comments.length && (
              <hr className={classes.visibleSeperator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}

export default withStyles(styles)(Comments);
