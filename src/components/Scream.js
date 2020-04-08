import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

// MUI imports
import { withStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Local imports
import MyButton from "./MyButton";
import { useSelector, useDispatch } from "react-redux";
import { likeScream } from "../redux/actions/dataActions";

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
  const dispatch = useDispatch();
  const { likes, authenticated } = useSelector((state) => state.user);
  dayjs.extend(relativeTime);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes.length && likes.find((like) => like.screamId === screamId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, screamId]);

  const handleLike = () => {
    dispatch(likeScream(screamId));
  };
  const likeButton = !authenticated ? (
    <MyButton title="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : liked ? (
    <MyButton handleClick={handleLike} title="Unlike">
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton handleClick={handleLike} title="Like">
      <FavoriteBorder color="primary" />
    </MyButton>
  );

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
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton title="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Scream);
