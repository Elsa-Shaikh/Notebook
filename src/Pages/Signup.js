import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../Utils/handleUserApi";
import AlertMessage from "../components/AlertMessage";

const Signup = ({ showAlert }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = user;
    try {
      // Check if the password and confirm password match
      if (password !== cpassword) {
        setSnackbarState({
          open: true,
          severity: "error",
          message: "Passwords do not match!",
        });
        return; // Stop the function if passwords don't match
      }
      const json = await userSignup(name, email, password);
      if (json.success) {
        navigate("/login");
        showAlert("Account Created Successfully", "success");
        setUser({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      } else {
        showAlert("Email Already Exist!", "danger");
      }
    } catch (error) {
      showAlert("Failed to Create Account!", "danger");

    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Grid container spacing={2} marginTop={5}>
        <Grid item xs={12} m={1}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                width: "500px",
                bgcolor: "rgb(202,199,198)",
                borderRadius: "20px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Stack spacing={1} direction={"column"} p={5}>
                <Typography variant="h4">Create an Account</Typography>
                <Typography variant="h6">to use Notebook</Typography>
              </Stack>
              <Divider />
              <Stack spacing={2} direction={"column"} p={5}>
                <TextField
                  type="text"
                  id="name"
                  label="Name"
                  placeholder="Enter Your Name"
                  variant="outlined"
                  onChange={handleChange}
                  name="name"
                  value={user.name}
                  required
                />
                <TextField
                  type="email"
                  id="email"
                  label="Email"
                  placeholder="Enter Your Email Address"
                  variant="outlined"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="Enter Password"
                  variant="outlined"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                <TextField
                  type="password"
                  id="cpassword"
                  label="Confirm Password"
                  placeholder="Enter Confirm Password"
                  variant="outlined"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleChange}
                  required
                />
                <Button variant="contained" type="submit" color="info">
                  Sign Up
                </Button>
                <Typography variant="h6" textAlign={"center"}>
                  Already have an Account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </form>
        </Grid>
      </Grid>
      <AlertMessage
        open={snackbarState.open}
        severity={snackbarState.severity}
        message={snackbarState.message}
        onClose={() => setSnackbarState({ ...snackbarState, open: false })}
      />
    </>
  );
};

export default Signup;
