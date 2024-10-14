const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { all, add, remove, edit, book } = require("../controllers/books");

router.get("/", auth, all);

router.get("/:id", auth, book);

router.post("/add", auth, add);

router.put("/edit/:id", auth, edit);

router.post("/remove/:id", auth, remove);

module.exports = router;
