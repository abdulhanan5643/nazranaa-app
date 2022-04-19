import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import "./styles.css";

const AdminLogin = ({ setIsLoggedIn, navigate }) => {
  const adminPassword = process.env.REACT_APP_PASSWORD;
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    if (password) {
      if (password === adminPassword) {
        setIsLoggedIn(true);
        navigate("/admin-dashboard");
      } else {
        toast.error("Invalid password! Try again.", {
          style: {
            color: "white",
          },
        });
      }
    } else {
      toast.error("Password cannot be empty!", {
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
      <div style={{ backgroundColor: "#EEEEEE" }}>
        <Container sx={{ height: "100vh" }}>
          <Grid
            container
            justifyContent="center"
            p={2}
            sx={{ height: "100vh", alignItems: "center" }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Card sx={{ backgroundColor: "#FBF8F1" }}>
                  <CardHeader
                    title="Admin Login"
                    sx={{
                      backgroundColor: "#F7F7F7",
                      textAlign: "center",
                      paddingY: "10%",
                    }}
                  />
                  <CardContent>
                    <form onSubmit={(e) => login(e)}>
                      <Grid
                        sx={{ paddingY: "15%" }}
                        container
                        direction="column"
                        rowSpacing={3}
                      >
                        <Grid item>
                          <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                          >
                            Login
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default AdminLogin;
