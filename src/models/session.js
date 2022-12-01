import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: { type: String, unique: true },
  expiration: { type: Date },
});

const SessionModel = mongoose.model("Session", SessionSchema);

export default SessionModel;
