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

function CenteredLoading({ classes }) {
  return (
    <div className={classes.centeredDiv}>
      <CircularProgress className={classes.loader} size={30} />
    </div>
  );
}

export default withStyles(styles)(CenteredLoading);
