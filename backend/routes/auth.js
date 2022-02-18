const express = require('express');
var bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'thisisworkingnow';

// ROUTE 1 : Create a user using : POST  "/api/auth/createuser". Doesnt require Authentication/login.

router.post('/createuser', [
  body('email').isEmail(),
  body('name').isLength({ min: 3 }),
  body('password').isLength({ min: 5 }),

], async (req, res) => {
  // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // check whether a user with this email already exist
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    // creating a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })

    const data = {
      user: { id: user.id }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  }

  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2 : Authenticating a user using : POST  "/api/auth/login".

router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'enter a valid password').exists(),

], async (req, res) => {

  // if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Incorrect name or password' });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: 'Incorrect name or password' });
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// ROUTE 3 : Get loggedIn User Details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser,async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }

  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

module.exports = router
