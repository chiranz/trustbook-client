import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/scream/Scream";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../components/profile/Profile";
import { getScreams } from "../redux/actions/dataActions";
import CenteredLoading from "../components/CenteredLoading";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScreams());
  }, [dispatch]);

  const { screams, loading } = useSelector((state) => state.data);

  return (
    <Grid container spacing={4}>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={8} xs={12}>
        {loading ? (
          <CenteredLoading />
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
