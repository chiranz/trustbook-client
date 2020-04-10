// Module Imports
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
// MUI imports
import Grid from "@material-ui/core/Grid";
// Local Imports
import { getUserData } from "../redux/actions/dataActions";
import CenteredLoading from "../components/CenteredLoading";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import { Typography } from "@material-ui/core";

export default function UserPage({
  match: {
    params: { handle },
  },
}) {
  const { screams } = useSelector((state) => state.data);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getUserData(handle));
    async function getProfile() {
      await Axios.get(`/user/${handle}`)
        .then((res) => {
          setProfile(res.data.user);
        })
        .catch((err) => console.log(err));
      setLoading(false);
    }
    getProfile();
  }, [dispatch, handle]);

  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {loading ? (
          <CenteredLoading size={100} thickness={2} />
        ) : screams.length ? (
          screams.map((scream, id) => (
            <Scream key={id} scream={scream}>
              {scream.body}
            </Scream>
          ))
        ) : (
          <Typography variant="h5" color="textSecondary">
            No screams from this user!
          </Typography>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        {!profile ? (
          <CenteredLoading size={50} thickness={3} />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
}
