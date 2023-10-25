import React, { useState } from "react";
import { useSelector } from "react-redux";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const authToken = useSelector((state) => state.auth.authToken);

  const host = "http://localhost:5000/api";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  
  //Get all notes
  const getNotes = async() => {
    const response = await fetch(`${host}/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken      
  },
    });
    const json = await response.json();
    console.log("Notes Fetch: ",json);
    setNotes(json);
  };
  
  // Add a Note
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "auth-token": authToken
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note.newNote)); //For PostgresSQL
    // setNotes(notes.concat(note));     // For Mongodb
  };


  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // APi Call
    const response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
          "auth-token": authToken 
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
    console.log(json);
   let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
   
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element.id === id) {     // For PostgresSQL
//        if (element._id === id) { //For Mongodb
          newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // Delete a Note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         "auth-token": authToken
      },
    });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => {
      return note.id !== id;     //For PostgresSQL
      //return note._id !== id; //For Mongodb
    });
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote,getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
