import React from "react";
import { makeStyles } from "@material-ui/core";
// MUI Imports

const useStyles = makeStyles(() => ({
  container: {
    minWidth: 200,
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  head: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.3)",
  },
  body: {
    width: 200,
    height: 70,
    borderTopRightRadius: "50%",
    borderTopLeftRadius: "50%",
    background: "rgba(0,0,0,0.3)",
  },
}));

export default function UserSkeleton(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.head}></div>
      <div className={classes.body}></div>
    </div>
  );
}
