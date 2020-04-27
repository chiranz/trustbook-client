// Module imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI imports
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Local Imports
import { likeScream } from "../../redux/actions/dataActions";
import MyButton from "../MyButton";

export default function LikeButton({ screamId, setLikesCount }) {
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
    if (liked) {
      setLiked(false);
      setLikesCount((count) => count - 1);
    } else {
      setLiked(true);
      setLikesCount((count) => count + 1);
    }
    dispatch(likeScream(screamId));
  };

  if (!authenticated) {
    return (
      <Link to="/login">
        <MyButton title="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    );
  } else if (liked) {
    return (
      <MyButton handleClick={handleLike} title="Unlike">
        <FavoriteIcon color="primary" />
      </MyButton>
    );
  } else {
    return (
      <MyButton handleClick={handleLike} title="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    );
  }
}
