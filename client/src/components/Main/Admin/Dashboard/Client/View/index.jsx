import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Typography,
} from "@mui/material";
import ShowFriends from "./ShowFriends";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const ViewClient = ({ setSelectedComponent }) => {
  const [friends, setFriends] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [form, setForm] = useState("");
  const [selected, setSelected] = useState();
  const [hasFriends, setHasFriends] = useState(false);
  const [details, setDetails] = useState();
  useEffect(() => {
    const getClients = async () => {
      await axios.get("/api/client/get").then((res) => {
        setAllClients(res.data.client);
      });
    };
    getClients();
  }, []);

  useEffect(() => {
    if (selected) {
      const getDetails = async () => {
        await axios
          .post("/api/client/details", { id: selected })
          .then((res) => {
            setDetails(res.data.data);
          });
      };
      getDetails();
    }
  }, [selected]);
  const options = allClients
    ? allClients.map((client) => {
        return {
          value: client._id,
          label: `${client.first_name} ${client.last_name}`,
          form: client.form,
        };
      })
    : [];

  const archieveClient = (id) => {
    try {
      axios.post("/api/client/archieve", { id }).then((res) => {
        toast.success(res.data.message, {
          style: {
            color: "white",
          },
        });
      });
      window.location.reload();
      return false;
    } catch (err) {
      toast.error(
        "There was an error archieving the client. Please try again!",
        {
          style: {
            color: "white",
          },
        }
      );
      console.log(err);
    }
  };

  useEffect(() => {
    setSelectedComponent("View Client");
  }, []);
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
      <Box
        sx={{
          justifyContent: "center",
        }}
      >
        <Container>
          <Grid
            container
            className="paddingTop"
            sx={{
              margin: 0,
              paddingTop: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {allClients ? (
              <>
                <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
                  <Box>
                    <InputLabel
                      sx={{
                        textAlign: "left",
                        color: "#1b1a17",
                        fontSize: "large",
                      }}
                    >
                      Client
                    </InputLabel>
                    <Select
                      options={options}
                      onChange={(e) => {
                        setSelected(e.value);
                        setForm(e.form);
                      }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ textAlign: "center" }}
                  mt={{ xs: 3 }}
                >
                  <Box>
                    <Button
                      variant="contained"
                      disabled={selected ? false : true}
                      sx={{
                        backgroundColor: "#143F6B",
                        textAlign: "left",
                        color: "#fff",
                      }}
                      onClick={() => archieveClient(selected)}
                    >
                      Archieve Client
                    </Button>
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <Typography
                  variant="p"
                  component="div"
                  sx={{ color: "#1b1a17", fontSize: "large" }}
                >
                  Loading...
                </Typography>
              </>
            )}

            {details ? (
              <Grid item xs={12} sx={{ paddingTop: "2rem" }}>
                <Grid container>
                  <Grid item xs={12} sm={6} sx={{paddingY:"1rem"}}>
                    <Typography>
                      <strong>Event Date:</strong>{" "}
                      {moment(details.date).format("MM/DD/YYYY")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{paddingY:"1rem"}}>
                    <Typography>
                      <strong>Form Assigned:</strong> {details.form}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{paddingY:"1rem"}}>
                    <Typography>
                      <strong>Contact:</strong> {details.phone_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{paddingY:"1rem"}}>
                    <Typography>
                      <strong>Friends Allowed:</strong>{" "}
                      {details.friends_allowed}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}

            <Grid item xs={12} sx={{ textAlign: "center" }} mt={{ xs: 3 }}>
              <Box sx={{ display: "grid" }}>
                <ShowFriends
                  selected={selected}
                  setFriends={setFriends}
                  friends={friends}
                  formID={form}
                  hasFriends={hasFriends}
                  setHasFriends={setHasFriends}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ViewClient;
