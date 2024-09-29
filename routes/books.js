const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { all, add } = require("../controllers/books");

router.get("/", auth, all);

router.get("/:id", auth, () => console.log("get book by id"));

router.post("/add", auth, add);

router.post("/remove/:id", auth, () => console.log("remove book by id"));

router.put("/edit/:id", auth, () => console.log("edit book by id"));

module.exports = router;

