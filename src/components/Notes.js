import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import EditModal from "./EditModal";
import AlertMessage from "./AlertMessage";

const Notes = ({ showAlert }) => {
  const authToken = useSelector((state) => state.auth.authToken);
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  let navigate = useNavigate();

  const updateNote = (currentNote) => {
    handleOpen();
    setNote({
      id: currentNote.id, // For PostgresSQL
      // id: currentNote._id, // For Mongodb
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    try {
      editNote(note.id, note.etitle, note.edescription, note.etag);
      handleClose();
      setSnackbarState({
        open: true,
        severity: "success",
        message: "Note has been Updated",
      });
    } catch (error) {
      setSnackbarState({
        open: true,
        severity: "error",
        message: "Failed to Update Note!",
      });
    }
  };
  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("Notes in UseEffect:", notes);
    if (authToken) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />
      <Container sx={{ marginTop: "10px", marginBottom: "10px" }}>
        <Box>
          <Stack p={2} textAlign={"center"} marginTop={3}>
            <Typography variant="h4" fontWeight={"bold"}>
              <i className="fa-regular fa-note-sticky"></i> My Notes{" "}
              <i className="fa-regular fa-note-sticky"></i>
            </Typography>
          </Stack>
          <Grid container spacing={2} justifyContent="center">
            {notes.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography>Your Notes bucket is Empty!</Typography>
                </Paper>
              </Grid>
            )}
            <Grid
              item
              key={note.id} // For PostgresSQL
              // key={note._id} // For Mongodb
              xs={12}
              sm={6}
              md={10}
            >
              <Stack
                direction={"row"}
                spacing={2}
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"center"}
              >
                {notes?.map((note) => {
                  return (
                    <NoteItem
                      key={note.id} //For PostgresSQL
                      // key={note._id} //For Mongodb
                      note={note}
                      updateNote={updateNote}
                      showAlert={showAlert}
                    />
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <EditModal
          open={open}
          note={note}
          handleChange={handleChange}
          handleClose={handleClose}
          handleClick={handleClick}
        />
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

export default Notes;
