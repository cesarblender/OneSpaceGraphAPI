import SessionModel from "../models/session";
import UserModel from "../models/user";
import { DecodeJWT } from "./jwt";

export default async function AuthenticateUser(token) {
  const decoded = DecodeJWT(token, process.env.JWT_SECRET);

  const isTheSessionSaved = await SessionModel.findOne({
    token,
    user: decoded._id,
  });

  if (!isTheSessionSaved) {
    throw new Error("The session is not saved.");
  }

  return await UserModel.findById(decoded._id);
}
