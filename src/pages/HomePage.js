import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import Scream from "../components/Scream";

export default function HomePage() {
  const [screams, setScreams] = useState([]);
  useEffect(() => {
    Axios.get("/screams")
      .then((res) => {
        setScreams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const recentScreamsMarkup = screams.length ? (
    screams.map((scream, id) => (
      <Scream key={id} scream={scream}>
        {scream.body}
      </Scream>
    ))
  ) : (
    <p>Loading...</p>
  );
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    </div>
  );
}
