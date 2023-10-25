import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({
  open,

  handleClose,
  handleClick,
  note,
  handleChange,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Note
          </Typography>
          <Stack spacing={2} direction={"column"} p={2} marginTop={3}>
            <TextField
              label="Note Title"
              placeholder="Enter Your Note Title"
              variant="outlined"
              type="text"
              className="form-control"
              id="etitle"
              value={note.etitle}
              name="etitle"
              onChange={handleChange}
              required
              minLength={5}
            />
            <TextField
              label="Note Description"
              placeholder="Enter Your Note Description"
              variant="outlined"
              type="text"
              className="form-control"
              id="edescription"
              value={note.edescription}
              name="edescription"
              onChange={handleChange}
              required
              minLength={5}
            />
            <TextField
              label="Note Tag"
              placeholder="Enter Your Note Tag"
              variant="outlined"
              type="text"
              className="form-control"
              id="etag"
              value={note.etag}
              name="etag"
              onChange={handleChange}
              required
              minLength={5}
            />
          </Stack>
          <Stack
            spacing={2}
            direction={"row"}
            mt={2}
            display={"flex"}
            justifyContent={"end"}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="info"
              startIcon={<EditIcon />}
              onClick={handleClick}
               disabled={note.etitle.length < 5 || note.edescription.length < 5}
            >
              Edit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default EditModal;
