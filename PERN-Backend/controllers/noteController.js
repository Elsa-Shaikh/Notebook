const prisma = require("../prisma/index");
const { body, validationResult } = require("express-validator");

exports.addNote = async (req, res) => {
  try {
    const validationRules = [
      body("title", "Title atleast 3 Characters").isLength({ min: 3 }),
      body("description", "Description atleast 5 Characters").isLength({
        min: 5,
      }),
    ];
    await Promise.all(validationRules.map((validation) => validation.run(req)));

    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        description,
        tag,
        authorId: req.user.id, // Assuming you have a user authenticated and the user ID is available in req.user.id
      },
    });

    res
      .status(200)
      .json({ success: true, newNote, message: "Note has been Added!" });
  } catch (error) {
    console.error("Error during Adding Note:", error);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {}; // create a new note object

    if (title) {
      newNote.title = title;
    }

    if (description) {
      newNote.description = description;
    }

    if (tag) {
      newNote.tag = tag;
    }

    const note = await prisma.note.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!note) {
      return res.status(404).send("Not Found!");
    }

    if (note.authorId !== req.user.id) {
      return res.status(403).send("Not Allowed!");
    }

    const updatedNote = await prisma.note.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: newNote,
    });

    res.json({
      success: true,
      note: updatedNote,
      message: "Note has been Updated!",
    });
  } catch (error) {
    console.error("Error during Updating Note:", error);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!note) {
      return res.status(404).send("Not Found!");
    }

    if (note.authorId !== req.user.id) {
      return res.status(403).send("Not Allowed!");
    }

    const deletedNote = await prisma.note.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json({
      success: true,
      note: deletedNote,
      message: "Note has been deleted!",
    });
  } catch (error) {
    console.error("Error during delete Note:", error);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

exports.fetchNote = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        authorId: req.user.id,
      },
    });

    // res.json({ success: true, notes, message: "Fetched all the Notes!" });
    res.json(notes);

  } catch (error) {
    console.error("Error during fetching user all Notes:", error);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};
