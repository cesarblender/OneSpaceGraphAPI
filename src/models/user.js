import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "non_binary", "other"],
    required: true,
  },
  verified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["user", "mod", "staff", "admin"],
    default: "user",
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  blockedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      default: [],
    },
  ],
  profilePicture: { type: String, default: "" },
  coverPhoto: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  sessions: [{ type: Schema.Types.ObjectId, ref: "Sessions", default: [] }],
  rank: {
    type: String,
    enum: ["user", "mod", "staff", "admin"],
    default: "user",
  },
  nickname: { type: String },
  showNicknameInsteadName: { type: Boolean },
});

const UserModel = model("User", UserSchema);

export default UserModel;
