const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { login, signup, current } = require("../controllers/user");

router.get("/current", auth, current);

router.post("/login", login);

router.post("/signup", signup);

module.exports = router;
