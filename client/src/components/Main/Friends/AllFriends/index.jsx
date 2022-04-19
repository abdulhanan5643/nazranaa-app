import React, { useContext, useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import ShowFriends from "../../Admin/Dashboard/Client/View/ShowFriends";
import { GlobalContext } from "../../../../context/GlobalContext";

const AllFriends = () => {
  const [friends, setFriends] = useState([]);
  const [hasFriends, setHasFriends] = useState(false);
  const { clientId, form } = useContext(GlobalContext);

  return (
    <>
      <Grid
        container
        sx={{ boxShadow: friends.length ? 4 : 0 }}
        height={"100%"}
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Box>
            <ShowFriends
              friends={friends}
              selected={clientId}
              setFriends={setFriends}
              formID={form}
              setHasFriends={setHasFriends}
              hasFriends={hasFriends}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AllFriends;
