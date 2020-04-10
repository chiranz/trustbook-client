import React from "react";
import { withStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  centeredDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    position: "relative",
  },
  loader: {
    position: "absolute",
  },
});

function CenteredLoading({ classes, size, thickness }) {
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

export default withStyles(styles)(CenteredLoading);
