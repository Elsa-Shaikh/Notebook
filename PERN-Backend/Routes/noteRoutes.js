const express = require("express");
const router = express.Router();

const {
  addNote,
  updateNote,
  deleteNote,
  fetchNote,
} = require("../controllers/noteController");
const fetchUser = require("../middleware/fetchuser");

router.route("/addnote").post(fetchUser, addNote);
router.route("/updatenote/:id").put(fetchUser, updateNote);
router.route("/deletenote/:id").delete(fetchUser, deleteNote);
router.route("/fetchallnotes").get(fetchUser, fetchNote);

module.exports = router;
