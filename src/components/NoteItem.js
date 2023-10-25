import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import {
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      deleteNote(note.id); // For PostgesSQL
      // deleteNote(note._id); //  For Mongodb
      props.showAlert("Note has been Deleted", "success");
    } catch (error) {
      props.showAlert("Failed to delete Note!", "danger");
    }
  };

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <Stack textAlign={"center"} color={""}>
              <Typography variant="h6" fontWeight={"bold"}>
                {note.title}
              </Typography>
            </Stack>
            <Divider />
            <Stack marginTop={2} paddingLeft={1} color={"grey"}>
              <Typography variant="h6">{note.description}</Typography>
            </Stack>
            <Divider />
            <Stack marginTop={2}>
              <Chip
                icon={<LocalOfferIcon />}
                label={note.tag}
                variant="contained"
                color="info"
              />
            </Stack>
            <Divider />
            <Stack
              direction={"row"}
              marginTop={2}
              display={"flex"}
              justifyContent={"center"}
            >
              <Paper>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="info"
                  onClick={() => {
                    updateNote(note);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Paper>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
