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
  Modal,
  Button,
} from "@mui/material";
import rise from "./assets/images/images.jpeg";
import toast, { Toaster } from "react-hot-toast";
import React, { useContext, useState } from "react";
import "./styles.css";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const schema = yup.object().shape({
  ankle: yup.number().positive().integer().required(),
  bottomLength: yup.number().positive().integer().required(),
  chest: yup.number().positive().integer().required(),
  height1: yup.number().positive().integer().required(),
  height2: yup.number().positive().integer().required(),
  hips: yup.number().positive().integer().required(),
  neck: yup.number().positive().integer().required(),
  rise: yup.number().positive().integer().required(),
  shoeSize: yup.number().positive().integer().required(),
  shoulder: yup.number().positive().integer().required(),
  sleeveLength: yup.number().positive().integer().required(),
  suitSize: yup.number().positive().integer().required(),
  thigh: yup.number().positive().integer().required(),
  topLength: yup.number().positive().integer().required(),
  underarm: yup.number().positive().integer().required(),
  waist: yup.number().positive().integer().required(),
  wrist: yup.number().positive().integer().required(),
});

const Kurta = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { clientId } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const number = /^[1-9]\d*$/;
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
          const formData = {
            reference_client_id: clientId,
            email,
            name,
            measurements: { ...data },
          };
          await axios.post("/api/friend/register", { formData }).then((res) => {
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

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("chest")}
                        className="tableInput"
                        type="text"
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
                        Waist
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference around belly button
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("waist")}
                        className="tableInput"
                        type="text"
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
                        Hips
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference over butt
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("hips")}
                        className="tableInput"
                        type="text"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.hips?.message}
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
                        Sleeve length
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        From shoulder to wrist
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("sleeveLength")}
                        className="tableInput"
                        type="text"
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

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("underarm")}
                        className="tableInput"
                        type="text"
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
                        Neck/Collar
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference around neck
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("neck")}
                        className="tableInput"
                        type="text"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.neck?.message}
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
                        Circumference around knuckles so the opening of the
                        sleeve can go through
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("wrist")}
                        className="tableInput"
                        type="text"
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
                        Length
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Measure from shoulder to how ever long you want it
                        (typically- knee length)
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("topLength")}
                        className="tableInput"
                        type="text"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.topLength?.message}
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
                        Length
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
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        For pant style, measure from belly button to floor only
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("bottomLength")}
                        className="tableInput"
                        type="text"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.bottomLength?.message}
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
                        Thigh
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference around one thigh
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("thigh")}
                        className="tableInput"
                        type="text"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.thigh?.message}
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
                        Ankle
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        Circumference around ankle
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("ankle")}
                        className="tableInput"
                        type="text"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.ankle?.message}
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
                        Rise
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px", color: "#332FD0" }}
                        onClick={handleOpen}
                      >
                        Look at photo attached
                      </Typography>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <img src={rise} />
                        </Box>
                      </Modal>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("rise")}
                        className="tableInput"
                        type="text"
                      />

                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.rise?.message}
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
                        Height
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        sx={{ marginRight: "2%", width: "23%" }}
                        {...register("height1")}
                        className="tableInput"
                        type="text"
                      />

                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        sx={{ marginLeft: "2%", width: "23%" }}
                        {...register("height2")}
                        className="tableInput"
                        type="text"
                      />

                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.height2?.message}
                      </Typography>
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.height1?.message}
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
                        American Suit Size
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontSize: "13px" }}
                      >
                        For example, 42 Reg, 38 Short
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("suitSize")}
                        className="tableInput"
                        type="text"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.suitSize?.message}
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
                        American Shoe Size
                      </Typography>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{ fontWeight: "400", fontSize: "10px" }}
                      >
                        (If ordered)
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        variant="standard"
                        {...register("shoeSize")}
                        className="tableInput"
                        type="text"
                      />
                      <Typography
                        sx={{
                          marginTop: "3%",
                          color: "red",
                          fontSize: "12px",
                        }}
                      >
                        {errors.shoeSize?.message}
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

export default Kurta;
