import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI imports
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ChatIcon from "@material-ui/icons/Chat";
// Local imports
import MyButton from "../MyButton";
import { useSelector } from "react-redux";
import DeleteButton from "./DeleteButton";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
}));

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
  openDialog,
}) {
  const {
    authenticated,
    credentials: { handle },
  } = useSelector((state) => state.user);
  dayjs.extend(relativeTime);
  const classes = useStyles();
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
          to={`/user/${userHandle}`}
        >
          {userHandle}
        </Typography>
        {authenticated && userHandle === handle ? (
          <DeleteButton screamId={screamId} />
        ) : null}

        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton title="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
}

export default Scream;
