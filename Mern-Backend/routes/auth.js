const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET;

//Route 1: create a user using : POST '/api/auth/createuser'.
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors, return bad request and the erros
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry Email already Exists!" });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);
      //create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send("Internal Server Error!");
    }
  }
);

//Route 2: Authenticate a user using: Post "/api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password Can't be blank!").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please Enter Correct Credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please Enter Correct Credentials!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send("Internal Server Error!");
    }
  }
);

//Route 3: get Logged-in user details, Get Loggedin user details using get: "/api/auth/getuser". login required
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password"); //  select except password field
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
