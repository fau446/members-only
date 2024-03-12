const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({})
    .sort({ date_posted: 1 })
    .populate("user")
    .exec();

  res.render("index", { post_list: allPosts, user: req.user });
});
