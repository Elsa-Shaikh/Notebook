import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../ReduxStore/actions/authAction";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../Utils/handleUserApi";

const Login = ({ showAlert }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const json = await userLogin(user.email, user.password);
      if (json.success) {
        dispatch(loginSuccess(json.user, json.authToken));
        navigate("/");
        showAlert("Login Successfully", "success");
      } else {
        showAlert("Invalid Email or Password!", "danger");
      }
    } catch (error) {
      showAlert("Failed to Login!", "danger");
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
      <Grid container spacing={2} marginTop={10}>
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
                <Typography variant="h4">Login to your Account</Typography>
                <Typography variant="h6">to write in Notebook</Typography>
              </Stack>
              <Divider />
              <Stack spacing={2} direction={"column"} p={5}>
                <TextField
                  type="email"
                  id="email"
                  label="Email"
                  placeholder="Enter Your Email Address"
                  variant="outlined"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
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

                <Button variant="contained" type="submit" color="info">
                  Login
                </Button>
                <Typography variant="h6" textAlign={"center"}>
                  Don't have an Account?{" "}
                  <Link
                    to={"/signup"}
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
