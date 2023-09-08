exports.DummyLink = (req, res) => {
  res.send("This is dummy page");
};

const Like = require("../models/LikeModel");
const Post = require("../models/PostModel");

exports.likePost = async (req, resp) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    console.log(post);
    console.log(user);
    const savedlike = await like.save();
    // console.log(savedlike);
    // console.log(savedlike.id);
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedlike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

    resp.json({
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      error: "Facing some error",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    // Find and delete from like collection
    const deleteLike = await Like.findOneDelete({ post: post, _id: like });

    //update the post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deleteLike._id } },
      { new: true }
    );
    resp.status(200).json({
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      error: "Facing some error",
    });
  }
};
