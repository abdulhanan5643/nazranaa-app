import {
  Box,
  FormGroup,
  Grid,
  TextField,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  blouseLength: yup.number().positive().integer().required(),
  chest: yup.number().positive().integer().required(),
  lowerChest: yup.number().positive().integer().required(),
  neckDepthFront: yup.number().positive().integer().required(),
  neckDepthBack: yup.number().positive().integer().required(),
  sleeveRound: yup.number().positive().integer().required(),
  upperChest: yup.number().positive().integer().required(),
  shoulder: yup.number().positive().integer().required(),
  sleeveLength: yup.number().positive().integer().required(),
  underarm: yup.number().positive().integer().required(),
  waist: yup.number().positive().integer().required(),
  wrist: yup.number().positive().integer().required(),
});
const Bridesmaids = () => {
  const { clientId } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    if (name) {
      if (email) {
        if (email.match(mailformat)) {
          if (data.blouseLength >= 14 && data.blouseLength <= 18) {
            if (data.shoulder >= 14 && data.shoulder <= 20) {
              if (data.sleeveLength >= 3 && data.sleeveLength <= 24) {
                const formData = {
                  reference_client_id: clientId,
                  email,
                  name,
                  measurements: { ...data },
                };
                await axios
                  .post("/api/friend/register", { formData })
                  .then((res) => {
                    if (res.data.data) {
                      toast.error(res.data.data.message, {
                        style: {
                          color: "white",
                        },
                      });
                    } else {
                      if (res.data.code == 200) {
                        toast.success("Measurements saved successfully!", {
                          style: {
                            color: "white",
                          },
                        });
                      } else {
                        toast.error(
                          "There was an error saving your measurements. Try again!",
                          {
                            style: {
                              color: "white",
                            },
                          }
                        );
                      }
                    }
                  });
              } else {
                toast.error("Sleeve Length should be between 3-24 inches!", {
                  style: {
                    color: "white",
                  },
                });
              }
            } else {
              toast.error("Shoulder should be between 14-20 inches!", {
                style: {
                  color: "white",
                },
              });
            }
          } else {
            toast.error("Blouse Length should be between 14-18 inches!", {
              style: {
                color: "white",
              },
            });
          }
        } else {
          toast.error("Wrong email format!", {
            style: {
              color: "white",
            },
          });
        }
      } else {
        toast.error("Email cannot be empty!", {
          style: {
            color: "white",
          },
        });
      }
    } else {
      toast.error("Name cannot be empty!", {
        style: {
          color: "white",
        },
      });
    }
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
      <Box sx={{ paddingBottom: "5%" }}>
        <Grid container marginTop={"5%"}>
          <Grid item xs={8} sm={6} md={4} lg={3} marginTop={"2%"}>
            <FormGroup sx={{ marginLeft: "10px" }}>
              <InputLabel
                sx={{ fontWeight: "700", textAlign: "left", color: "#1b1a17" }}
              >
                Name
              </InputLabel>
              <TextField
                variant="standard"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={8} sm={6} md={4} lg={3} marginTop={"2%"}>
            <FormGroup sx={{ marginLeft: "10px" }}>
              <InputLabel
                sx={{ fontWeight: "700", textAlign: "left", color: "#1b1a17" }}
              >
                Email
              </InputLabel>
              <TextField
                variant="standard"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Grid container marginTop={"2%"}>
          <Grid item xs={12} lg={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#22577E",
                        color: "#FFF",
                        border: "none",
                        padding: "20px",
                      }}
                    >
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "700", fontSize: "15px" }}
                      >
                        Measurements needed
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#22577E",
                        color: "#FFF",
                        border: "none",
                        padding: "20px",
                      }}
                    >
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "700", fontSize: "15px" }}
                      >
                        Measurement Description
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#22577E",
                        color: "#FFF",
                        border: "none",
                        padding: "20px",
                      }}
                    >
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "700", fontSize: "15px" }}
                      >
                        Measurement Ranges
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#22577E",
                        color: "#FFF",
                        border: "none",
                        padding: "20px",
                      }}
                    >
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "700", fontSize: "15px" }}
                      >
                        Measurements
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Upper chest
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference above chest
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("upperChest")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.upperChest?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Chest
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference around chest
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("chest")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.chest?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Lower Chest
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference underneath the chest
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("lowerChest")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.lowerChest?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Blouse length
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        From shoulder to however long you want it
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        14-20 in
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("blouseLength")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.blouseLength?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Shoulder
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Shoulder to Shoulder
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        14-20 in
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("shoulder")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.shoulder?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Waist
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference where blouse ends
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("waist")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.waist?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Sleeve length
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        From shoulder to however long you want it
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        For cap sleeves= 3-5 inches
                      </Typography>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        For elbow length sleeve = 10-11 inches
                      </Typography>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        For 3/4 sleeve= 15-17 inches
                      </Typography>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        For full sleeves= 19-24 inches
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("sleeveLength")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.sleeveLength?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Sleeve round
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference around bicep
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("sleeveRound")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.sleeveRound?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Underarm/armpit
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference where arm meets shoulder
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("underarm")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.underarm?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Wrist
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference where sleeves will end
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("wrist")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.wrist?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Neck depth front
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Measure diagonally, from shoulder to cleavage
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("neckDepthFront")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.neckDepthFront?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        Neck depth back
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Measure diagonally, from shoulder to how low you want it
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        type="text"
                        variant="standard"
                        {...register("neckDepthBack")}
                        className="tableInput"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.neckDepthBack?.message}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "5%", justifyContent: "center" }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Bridesmaids;
