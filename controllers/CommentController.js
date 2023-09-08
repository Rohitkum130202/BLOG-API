const Comment = require("../models/CommentModel");
const Post = require("../models/PostModel");

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    console.log("Request Body:", req.body);
    const comment = new Comment({
      post,
      user,
      body,
    });
    console.log("Post ID:", post);
    console.log("User ID:", user);
    console.log("Comment Body:", body);
    const saveComment = await comment.save();
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: saveComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();
    res.json({
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error while creating comment",
    });
  }
};

exports.getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find();

    res.json({
      comments,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error while fetching comments",
    });
  }
};
