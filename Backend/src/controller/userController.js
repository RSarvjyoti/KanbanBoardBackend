const userModel = require("../models/usersModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // if the user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  new user
    user = new userModel({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ msg: 'Registered successfully!' });
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const logout = async (req, res) => {
    try {
      // For JWT-based authentication, you would typically clear the token on the client-side
      // There's no server-side state to clear for JWT tokens
  
      res.clearCookie('jwtToken'); 
      res.json({ msg: 'Logged out successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  };
module.exports = { register, login , logout};
