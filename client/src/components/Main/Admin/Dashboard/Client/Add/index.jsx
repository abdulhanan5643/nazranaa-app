import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { videos } from "../../../../../../commonVariables/commonVariables";

const AddClient = ({ setSelectedComponent }) => {
  const today = moment(new Date());
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (
      moment(today).isBefore(data.eventDate) ||
      moment(today).isSame(data.eventDate)
    ) {
      let video;
      if (data.form == "Kurta") {
        video = videos.kurta;
      }

      if (data.form == "Anarkali") {
        video = videos.anarkali;
      }

      if (data.form == "Blouse") {
        video = videos.blouse;
      }

      if (data.form == "Bridesmaids") {
        video = videos.bridesmaids;
      }

      if (data.form == "Palazzo") {
        video = videos.palazzo;
      }

      const formData = {
        first_name: data.firstName,
        last_name: data.lastName,
        date: data.eventDate,
        form: data.form,
        video: video,
        phone_number: data.phoneNumber,
        friends_allowed: data.friendsLimit,
      };

      await axios
        .post("/api/client/add", { formData })
        .then((res) => {
          if (res.data.code == 200) {
            if (res.data.data.message == "Client already registered!") {
              toast.error(res.data.data.message, {
                style: {
                  color: "white",
                },
              });
            } else {
              toast.success(res.data.data.message, {
                style: {
                  color: "white",
                },
              });
              window.location.reload();
              return false;
            }
          } else {
            toast.error(res.data.error, {
              style: {
                color: "white",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occured while adding client. Try again!", {
            style: {
              color: "white",
            },
          });
        });
    } else {
      toast.error("Date should not be past date.", {
        style: {
          color: "white",
        },
      });
    }
  };

  useEffect(() => {
    setSelectedComponent("Add Client");
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
          width: "100%",
          justifyContent: "center",
          marginBottom: "15px",
        }}
      >
        <Container className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              className="paddingTop"
              sx={{
                marginTop: "3%",
                width: "100%",
                margin: 0,
                padding: "5%",
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ textAlign: "center", padding: "3%" }}
              >
                <Box>
                  <InputLabel sx={{ textAlign: "left", color: "#1b1a17" }}>
                    First Name
                  </InputLabel>
                  <Input
                    type="text"
                    sx={{ width: "100%" }}
                    {...register("firstName", { required: true })}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ textAlign: "center", padding: "3%" }}
              >
                <Box>
                  <InputLabel sx={{ textAlign: "left", color: "#1b1a17" }}>
                    Last Name
                  </InputLabel>
                  <Input
                    type="text"
                    sx={{ width: "100%" }}
                    {...register("lastName", { required: true })}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ textAlign: "center", padding: "3%" }}
              >
                <Box>
                  <InputLabel sx={{ textAlign: "left", color: "#1b1a17" }}>
                    Event Date
                  </InputLabel>
                  <Input
                    type="date"
                    sx={{ width: "100%" }}
                    {...register("eventDate", { required: true })}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ textAlign: "center", padding: "3%" }}
              >
                <Box>
                  <InputLabel sx={{ textAlign: "left", color: "#1b1a17" }}>
                    Form
                  </InputLabel>
                  <Select
                    variant="standard"
                    defaultValue="select"
                    sx={{ width: "100%", textAlign: "left" }}
                    {...register("form", { required: true })}
                  >
                    <MenuItem value="select">
                      <em>Select...</em>
                    </MenuItem>
                    <MenuItem value="Kurta">
                      <em>Kurta</em>
                    </MenuItem>
                    <MenuItem value="Anarkali">
                      <em>Anarkali</em>
                    </MenuItem>
                    <MenuItem value="Blouse">
                      <em>Blouse</em>
                    </MenuItem>
                    <MenuItem value="Bridesmaids">
                      <em>Bridesmaids</em>
                    </MenuItem>
                    <MenuItem value="Lehanga">
                      <em>Lehanga</em>
                    </MenuItem>
                    <MenuItem value="Palazzo">
                      <em>Palazzo</em>
                    </MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ textAlign: "center", padding: "3%" }}
              >
                <Box>
                  <InputLabel sx={{ textAlign: "left", color: "#1b1a17" }}>
                    Phone Number
                  </InputLabel>
                  <Input
                    type="tel"
                    sx={{ width: "100%" }}
                    {...register("phoneNumber", { required: true })}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ textAlign: "center", padding: "3%" }}
              >
                <Box>
                  <InputLabel sx={{ textAlign: "left", color: "#1b1a17" }}>
                    Friends Limit
                  </InputLabel>
                  <Input
                    type="number"
                    sx={{ width: "100%" }}
                    {...register("friendsLimit", { required: true })}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
              <Box>
                <Button type="submit" color="primary" variant="contained">
                  Add Client
                </Button>
              </Box>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddClient;
