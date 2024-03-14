const Post = require("../models/post");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({})
    .sort({ date_posted: 1 })
    .populate("user")
    .exec();

  res.render("index", { post_list: allPosts, user: req.user });
});

exports.create_post = [
  body("postContent", "Your post cannot be empty!")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const allPosts = await Post.find({})
        .sort({ date_posted: 1 })
        .populate("user")
        .exec();

      res.render("index", {
        post_list: allPosts,
        user: req.user,
        errors: errors.array(),
      });
    } else {
      const postDetail = {
        user: req.user,
        message: req.body.postContent,
      };

      const post = new Post(postDetail);
      await post.save();
      res.redirect("/");
    }
  }),
];

exports.delete_post = asyncHandler(async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.body.messageid);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});
