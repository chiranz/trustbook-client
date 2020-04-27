import React, { Fragment } from "react";

// MUI import
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
// Local imports
import UserSkeleton from "./UserSkeleton";
import CenteredLoading from "../CenteredLoading";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: `rgba(0,0,0,.3)`,
    marginBottom: 10,
  },
  fullline: {
    height: 15,
    width: "90%",
    backgroundColor: `rgba(0,0,0,.6)`,
    marginBottom: 10,
  },
  halfline: {
    height: 15,
    width: "45%",
    backgroundColor: `rgba(0,0,0,.6)`,
    marginBottom: 10,
  },
}));

export function ScreamSkeleton() {
  const classes = useStyles();
  const content = Array.from({ length: 5 }).map((_, index) => {
    return (
      <Card className={classes.card} key={index}>
        <CardMedia className={classes.cover} component={UserSkeleton} />
        <CardContent className={classes.cardContent}>
          <div className={classes.handle}></div>
          <div className={classes.date}></div>
          <div className={classes.fullline}></div>
          <div className={classes.fullline}></div>
          <div className={classes.halfline}></div>
        </CardContent>
      </Card>
    );
  });

  return <Fragment>{content}</Fragment>;
}

function ScreamLoading() {
  const classes = useStyles();
  const content = Array.from({ length: 5 }).map((_, index) => {
    return (
      <Card
        className={classes.card}
        key={index}
        style={{
          minHeight: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CenteredLoading />
      </Card>
    );
  });

  return <Fragment>{content}</Fragment>;
}

export default ScreamLoading;
