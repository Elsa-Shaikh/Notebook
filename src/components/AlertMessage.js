import { Alert, Snackbar } from "@mui/material";
import React from "react";

const AlertMessage = ({ severity, message, open, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertMessage;
