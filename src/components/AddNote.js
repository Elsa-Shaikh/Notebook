import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AlertMessage from "./AlertMessage";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    try {
      addNote(note.title, note.description, note.tag);
      setNote({
        title: "",
        description: "",
        tag: "",
      });
      setSnackbarState({
        open: true,
        severity: "success",
        message: "Note has been Added",
      });
    } catch (error) {
      setSnackbarState({
        open: true,
        severity: "error",
        message: "Failed to Add Note!",
      });
    }
  };
  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Container>
        <form>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={10}>
            <Paper sx={{ p: 2, borderRadius: "20px" }}>
              <Stack textAlign={"center"} mb={2}>
                <Typography variant="h3" fontWeight={"bold"}>
                  <i class="fa-solid fa-feather"></i> Write a Note{" "}
                  <i class="fa-solid fa-feather"></i>
                </Typography>
              </Stack>
              <Stack spacing={2} direction={"column"} p={2}>
                <TextField
                  label="Note Title"
                  placeholder="Enter Your Note Title"
                  variant="outlined"
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={note.title}
                  onChange={handleChange}
                  required
                  minLength={5}
                  helperText="Note title should be 5 characters!"
                />
                <TextField
                  label="Note Description"
                  placeholder="Enter Your Note Description"
                  variant="outlined"
                  type="text"
                  className="form-control"
                  id="description"
                  value={note.description}
                  name="description"
                  onChange={handleChange}
                  required
                  minLength={5}
                  helperText="Note description should be 5 characters!"
                />
                <TextField
                  label="Note Tag"
                  placeholder="Enter Your Note Tag"
                  variant="outlined"
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  value={note.tag}
                  onChange={handleChange}
                  required
                  minLength={5}
                  helperText="Note tag should be 5 characters!"
                />
                <Button
                  variant="contained"
                  sx={{ width: "200px" }}
                  color="secondary"
                  onClick={handleClick}
                  disabled={
                    note.title.length < 5 || note.description.length < 5
                  }
                >
                  Add Note
                </Button>
              </Stack>
            </Paper>
            </Grid>
            </Grid>         
        </form>
      </Container>
      <AlertMessage
        open={snackbarState.open}
        severity={snackbarState.severity}
        message={snackbarState.message}
        onClose={() => setSnackbarState({ ...snackbarState, open: false })}
      />
    </>
  );
};

export default AddNote;
