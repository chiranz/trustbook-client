import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  centeredDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    position: "relative",
  },
}));

function CenteredLoading({ size, thickness }) {
  const classes = useStyles();
  return (
    <div
      style={{ height: `${size ? size * 2 + "px" : ""}` }}
      className={classes.centeredDiv}
    >
      <CircularProgress
        thickness={thickness || 5}
        className={classes.loader}
        size={size || 30}
      />
    </div>
  );
}

export default CenteredLoading;
