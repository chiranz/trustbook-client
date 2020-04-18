import React from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/scream/Scream";
import { useSelector } from "react-redux";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../components/skeleton/ScreamSkeleton";

export default function HomePage() {
  const { screams, loading } = useSelector((state) => state.data);

  return (
    <Grid container spacing={4}>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={8} xs={12}>
        {loading ? (
          <ScreamSkeleton />
        ) : (
          screams.length &&
          screams.map((scream, id) => (
            <Scream key={id} scream={scream}>
              {scream.body}
            </Scream>
          ))
        )}
      </Grid>
    </Grid>
  );
}
