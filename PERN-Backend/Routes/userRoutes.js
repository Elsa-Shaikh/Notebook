const express = require("express");
const router = express.Router();

const { signup, login, getUser } = require("../controllers/userController");
const fetchUser = require("../middleware/fetchuser");

router.route("/createuser").post(signup);
router.route("/login").post(login);
router.route("/getuser").get(fetchUser, getUser);

module.exports = router;
