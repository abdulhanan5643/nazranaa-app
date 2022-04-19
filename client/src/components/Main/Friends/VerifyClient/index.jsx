import React, { useContext } from "react";
import { Grid, Input, InputLabel, Button, Box } from "@mui/material";
import { GlobalContext } from "./../../../../context/GlobalContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const VerifyClient = ({ setClientExist }) => {
  const { getClientId, getClientVideo, getClientForm } =
    useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
    };
    await axios.post("/api/client/verify", { formData }).then((res) => {
      if (res.data.success) {
        getClientId(res.data.client);
        getClientVideo(res.data.client);
        getClientForm(res.data.client);
        setClientExist(true);
        toast.success("We found your friend!", {
          style: {
            color: "white",
          },
        });
      } else {
        setClientExist(false);
        toast.error("Sorry your friend is not registered to our system!", {
          style: {
            color: "white",
          },
        });
      }
    });
  };
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          sx={{
            width: "100%",
          }}
          marginTop={{ xs: 8 }}
        >
          <Grid item xs={12} sm={4} md={3} padding={"23px"}>
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
          <Grid item xs={12} sm={4} md={3} padding={"23px"}>
            <InputLabel sx={{ textAlign: "left", color: "#1b1a17" }}>
              Last Name
            </InputLabel>
            <Input
              type="text"
              sx={{ width: "100%" }}
              {...register("lastName", { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} padding={"23px"}>
            <InputLabel sx={{ textAlign: "left", color: "#1b1a17" }}>
              Phone Number
            </InputLabel>
            <Input
              type="tel"
              sx={{ width: "100%" }}
              {...register("phoneNumber", { required: true })}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            padding={"23px"}
            sx={{ textAlign: "center" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ height: "100%" }}
            >
              Verify
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default VerifyClient;
