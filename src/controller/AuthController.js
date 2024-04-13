const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const blacklist = require("../utils/blacklist");

async function register(req, res) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log(user,'user')
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username }, "secret_key");
      res.status(200).send({ token: token, data: user, success: 200 });
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function logout(req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    blacklist.addToken(token); // Add token to blacklist
    res.status(200).send("Logged out successfully");
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

function protectedRoute(req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }
  try {
    const decoded = jwt.verify(token, "secret_key");
    res.send(`Welcome ${decoded.username}! This is a protected route.`);
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

module.exports = { register, login, logout, protectedRoute };
