var express = require("express");
var router = express.Router();

// Require controller modules
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

/// POST ROUTES ///

// GET request for main page
router.get("/", postController.index);

// POST request for creating a post

/// USER ROUTES ///

// GET request for login?
router.get("/login", function (req, res, next) {
  res.render("index", { title: "Login Page" });
});

// POST request for creating an account

module.exports = router;
