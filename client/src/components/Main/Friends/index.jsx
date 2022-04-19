import React, { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import VerifyClient from "./VerifyClient";
import Video from "./Video";
import AllFriends from "./AllFriends";
import Anarkali from "./Forms/Women/Anarkali";
import Blouse from "./Forms/Women/Blouse";
import Palazzo from "./Forms/Women/Palazzo";
import Bridesmaids from "./Forms/Women/Bridesmaids";
import Kurta from "./Forms/Men/Kurta";
import Lehanga from "./Forms/Women/Lehanga";
import { GlobalContext } from "../../../context/GlobalContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Friends = () => {
  const { form, clientId } = useContext(GlobalContext);
  const [clientExist, setClientExist] = useState(false);
  const [limitExceeded, setLimitExceeded] = useState();
  useEffect(() => {
    if (clientExist) {
      const getLimit = async () => {
        await axios
          .post("/api/friend/checkLimit", { id: clientId })
          .then((res) => {
            if (res.data.limitExceeded) {
              setLimitExceeded(true);
            } else {
              setLimitExceeded(false);
            }
          });
      };
      getLimit();
    }
  }, [clientExist]);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "700", fontSize: "21px", flexGrow: 1 }}
            >
              Measurements Form
            </Typography>
            <Link
              to="/admin"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container>
          <VerifyClient setClientExist={setClientExist} />
          {clientExist ? (
            <>
              <Grid container marginTop={"5%"} justifyContent="center">
                <Grid item xs={12} lg={8} padding={1}>
                  <Video />
                </Grid>
              </Grid>
              <Grid
                container
                marginTop={"5%"}
                height={{ sm: "100%" }}
                justifyContent="center"
              >
                <Grid item xs={12} padding={1}>
                  <AllFriends />
                </Grid>
              </Grid>

              {limitExceeded ? (
                <>
                  <Grid container justifyContent="center" my="5%">
                    <Grid item>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "400", color: "#E41749" }}
                      >
                        Seems like the maximum number of entries allowed is
                        reached, please contact
                        <strong
                          onClick={() =>
                            (window.location = "mailto:nazranaanj@gmail.com")
                          }
                        >
                          {" "}
                          nazranaanj@gmail.com
                        </strong>{" "}
                        if you think this is an error
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              ) : form == "Anarkali" ? (
                <Anarkali />
              ) : <></> && form == "Kurta" ? (
                <Kurta />
              ) : <></> && form == "Blouse" ? (
                <Blouse />
              ) : <></> && form == "Bridesmaids" ? (
                <Bridesmaids />
              ) : <></> && form == "Palazzo" ? (
                <Palazzo />
              ) : <></> && form == "Lehanga" ? (
                <Lehanga />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Friends;
