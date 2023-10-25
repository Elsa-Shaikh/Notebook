import { Stack, Typography } from "@mui/material";
import React from "react";

function Alert(props) {
  return (
    <>
      <Stack style={{ height: "50px", width: "400px" }}>
        {props.alert && (
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <Typography>{props.alert.msg}</Typography>
          </div>
        )}
      </Stack>
    </>
  );
}

export default Alert;
