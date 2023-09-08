const Post = require("../models/PostModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savepost = await post.save();

    res.json({
      post: savepost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while Posting",
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();
    res.json({
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while fetching Post",
    });
  }
};
