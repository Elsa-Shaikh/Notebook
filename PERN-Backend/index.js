const express = require("express");
var cors = require("cors");

require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use(cors());
//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./Routes/userRoutes");
const noteRouter = require("./Routes/noteRoutes");

app.use("/api/auth", userRouter);
app.use("/api/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Notebook Back-End listening on port http://localhost:${port}`);
});
