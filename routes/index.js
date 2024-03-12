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

// GET request for login
router.get("/login", userController.login_get);

// POST request for login
router.post("/login", userController.login_post);

// GET request for sign-up
router.get("/sign-up", userController.sign_up_get);

// POST request for sign-up
router.post("/sign-up", userController.sign_up_post);

// Log out request
router.get("/logout", userController.logout);

module.exports = router;
