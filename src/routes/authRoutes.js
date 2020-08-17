const express = require("express");
const authController = require("../controllers/authController");
const noteController = require("../controllers/noteController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/notes", noteController.createNote);

module.exports = router;
