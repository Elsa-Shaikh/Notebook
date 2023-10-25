const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/index");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    // Define validation rules
    const validationRules = [
      body("name", "Enter a Valid Name").isLength({ min: 3 }),
      body("email", "Enter a Valid Email").isEmail(),
      body("password", "Enter a valid password").isLength({ min: 5 }),
    ];
    // Run validation
    await Promise.all(validationRules.map((validation) => validation.run(req)));
    // Check for validation errors
    const errors = validationResult(req);
    // If there are errors, return a bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    // Check whether the user with this email already exists
    let existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "This Email already Exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(req.body.password, salt);

    // Create a user
    let newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      },
    });

    const data = {
      user: {
        id: newUser.id,
      },
    };
    // Generate JWT token
    const authToken = jwt.sign(data, JWT_SECRET);
    // Send a JSON response
    res
      .status(200)
      .json({ success: true, authToken, message: "Account Created!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

exports.login = async (req, res) => {
  try {
    const validationRules = [
      body("email", "Enter a Valid Email").isEmail(),
      body("password", "Password Can't be blank!").exists(),
    ];
    await Promise.all(validationRules.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    // Check whether the user with this email already exists
    let checkUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, error: "Please Enter Correct Email!" });
    }

    const passwordCompare = await bcrypt.compare(password, checkUser.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success: false, error: "Please Enter Correct Password!" });
    }

    const data = {
      user: {
        id: checkUser.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res
      .status(200)
      .json({ success: true, authToken, message: "Login Successfully!" });
  } catch (error) {
    console.error("Error during Login:", error);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

exports.getUser = async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    // res.json({
    //   success: true,
    //   user,
    //   message: "Fetched the Details of Current User!",
    // });
    res.send(user);
  } catch (error) {
    console.error("Error during Fetch User:", error);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};
