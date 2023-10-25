import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Stack } from "@mui/material";
import {fetchUserData} from "../Utils/handleUserApi";
import { logout } from '../ReduxStore/actions/authAction';


const Navbar = ({showAlert}) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // Access isAuthenticated and authToken from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authToken = useSelector((state) => state.auth.authToken);


  const [userData, setUserData] = useState({});
  const [initials, setInitials] = useState({});

  const extractInitials = (name) => {
    // Extract the first character of each word in the name
    const initialsArray = name
      ?.split(" ")
      ?.map((word) => word?.charAt(0))
      ?.filter((char) => char !== ""); // Remove empty characters in case of extra spaces
    // Assuming you want the first and second initials
    const firstInitial = initialsArray[0] || "";
    const secondInitial = initialsArray[1] || "";

    // Set the initials in state
    setInitials({
      firstInitial: firstInitial?.toUpperCase(),
      secondInitial: secondInitial?.toUpperCase(),
    });
  };


  const handleUserData = async () => {
    try {
      if (!authToken) {
        console.error('Auth token is missing.');
        return;
      }
      const userData = await fetchUserData(authToken);
      setUserData(userData);
      extractInitials(userData.name);
    } catch (error) {
      showAlert('Failed to Load User Data!', 'danger');
    }
  }

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login');
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleUserData();
    }
  // eslint-disable-next-line
  }, [isAuthenticated, authToken]);
 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <EditNoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              NoteBook
            </Typography>
            {!isAuthenticated ?(
              ""
            ):(
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/about");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">About</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )
          }

            <EditNoteIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              NoteBook
            </Typography>
            {!isAuthenticated ? (
            "") : (
              <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",

                  justifyContent: "center",
                },
              }}
            >
              <Button
                onClick={() => {
                  navigate("/");
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              <Button
                onClick={() => {
                  navigate("/about");
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                About
              </Button>
            </Box>
          )}
            {!isAuthenticated ? (
              <>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: {
                      xs: "none",
                      md: "flex",

                      justifyContent: "end",
                    },
                  }}
                >
                  <Button
                    onClick={() => {
                      navigate("/login");
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/signup");
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 0, p: 1 }}>
                  <Stack direction={"row"} spacing={1}>
                    <Tooltip title="Profile">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="info">
                        <Avatar sx={{bgcolor:'rgb(2,136,209)'}}>
                          {initials.firstInitial}
                          {initials.secondInitial}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Stack direction={"column"}>
                      <Typography
                        sx={{ color: "white", fontSize: "12px", pt: "3px" }}
                      >
                        {userData.name}
                      </Typography>
                      <Typography sx={{ color: "white", fontSize: "12px" }}>
                        {userData.email}{" "}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        handleCloseUserMenu();
                      }}
                    >
                      <LogoutIcon color="warning" sx={{ cursor: "pointer" }} />

                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
