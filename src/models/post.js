import { Schema, Types, model } from "mongoose";

const PostSchema = new Schema({
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
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  image: {
    type: String,
    trim: true
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: "User",
      default: []
    }
  ],
  isReposted: { type: Boolean, default: false },
  original: {
    type: Types.ObjectId,
    ref: "Post",
    default: null
  },
  comments: [
    {
      type: Types.ObjectId,
      ref: "Comment",
      default: []
    }
  ]
});

const PostModel = model("Post", PostSchema);

export default PostModel;
