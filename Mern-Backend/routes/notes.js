const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes: Get "/api/notes/getuser". Login Required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});

//Route 2: adding a new note using post: Post "/api/notes/addnote". Login Required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Description atleast 5 Characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors, return bad request and the erros
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await notes.save();
      res.json(saveNotes);
    } catch (error) {
      res.status(500).send("Internal Server Error!");
    }
  }
);

//Route 3: Updating an existing note using put: Put "/api/notes/updatenote". Login Required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find the note to be updated and updated it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed!");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});

//Route 4: delete a note using delete: Delete "/api/notes/deletenote". Login Required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // find the note to be deleted and deleted it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }
    //Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed!");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been Deleted!", note: note });
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
