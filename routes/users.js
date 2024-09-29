const express = require("express");
const router = express.Router();
const { login, signup, current } = require("../controllers/users");
const { auth } = require("../middleware/auth");

router.post("/login", login);

router.post("/signup", signup);

router.get("/current", auth, current);

module.exports = router;
