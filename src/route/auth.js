const express = require("express");
const router = express.Router();
const { register, login, protectedRoute } = require("../controller/AuthController");

router.get("/", (req, res) => {
  res.status(200).send("APIs are working");
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", login);
router.get("/protected", protectedRoute);

module.exports = router;
