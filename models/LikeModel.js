const mongoose = require("mongoose");

// Creating model
const likeSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: String,
    required: true,
  },
});

//Exporting model
module.exports = mongoose.model("Like", likeSchema);
