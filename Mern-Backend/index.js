const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
require("dotenv").config();

connectToMongo(); // connect to database

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json()); // middleware to use the json

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Notebook Back-End listening on port http://localhost:${port}`);
});
