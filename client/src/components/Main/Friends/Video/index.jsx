import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { GlobalContext } from "../../../../context/GlobalContext";

const Video = () => {
  const { video } = useContext(GlobalContext);
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <iframe
            src={`https://www.youtube.com/embed/${video}`}
            width="100%"
            height="300px"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Video;
