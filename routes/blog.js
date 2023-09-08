const express = require("express");
const router = express.Router();

// Import controller
const {
  DummyLink,
  likePost,
  unlikePost,
} = require("../controllers/LikeController");
const {
  createComment,
  getAllComment,
} = require("../controllers/CommentController");
const { createPost, getAllPost } = require("../controllers/PostController");
//create mapping
router.get("/dummy", DummyLink);
//export module
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPost);
router.get("/comments", getAllComment);
router.post("/likes/like", likePost);
router.post("/like/unlike", unlikePost);
module.exports = router;
