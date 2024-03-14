const Post = require("../models/post");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const asyncHandler = require("express-async-handler");

// Display login page
exports.login_get = (req, res, next) => {
  res.render("login");
};

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// Display sign up page
exports.sign_up_get = (req, res, next) => {
  res.render("sign_up");
};

exports.sign_up_post = [
  // sanitize
  body("firstname", "First name cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastname", "Last name cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password must be at least 3 characters long")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("sign_up", {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        username: req.body.username,
        errors: errors.array(),
      });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
          first_name: req.body.firstname,
          last_name: req.body.lastname,
          username: req.body.username,
          password: hashedPassword,
          membership_status: "guest",
          admin: false,
        });
        const result = await user.save();
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    }
  }),
];

exports.make_member = [
  body("secret").trim().escape(),

  asyncHandler(async (req, res, next) => {
    if (req.body.secret === "coolio") {
      try {
        await User.findByIdAndUpdate(req.user, {
          membership_status: "member",
        });
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    } else {
      const allPosts = await Post.find({})
        .sort({ date_posted: 1 })
        .populate("user")
        .exec();

      res.render("index", {
        post_list: allPosts,
        user: req.user,
        incorrect_secret: true,
      });
    }
  }),
];
