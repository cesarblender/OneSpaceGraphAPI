const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: []
    }
  ],
  replies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
      default: []
    }
  ]
});

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
