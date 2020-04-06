import React from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/Scream";
import { useSelector } from "react-redux";
import ReactLoader from "react-loader";

export default function HomePage() {
  const { screams, loading } = useSelector((state) => state.data);
  return (
    <ReactLoader loaded={!loading}>
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {screams.length ? (
            screams.map((scream, id) => (
              <Scream key={id} scream={scream}>
                {scream.body}
              </Scream>
            ))
          ) : (
            <p></p>
          )}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    </ReactLoader>
  );
}
