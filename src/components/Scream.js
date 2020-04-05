import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI imports
import { withStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  image: {
    minWidth: 200,
  },
};

function Scream({
  scream: {
    body,
    userImage,
    createdAt,
    userHandle,
    screamId,
    likeCount,
    commentCount,
  },
  classes,
}) {
  dayjs.extend(relativeTime);
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile Image"
      />
      <CardContent className={classes.content}>
        <Typography
          color="primary"
          variant="h5"
          component={Link}
          to={`user/${userHandle}`}
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Scream);
