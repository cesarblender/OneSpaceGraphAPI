import UserModel from "../../models/user";
import GetContextUser from "../../utils/getContextUser";

export default async function GetNotFollowingController(root, args, context) {
  let user = await GetContextUser(context);

  const notFollowing = await UserModel.find({ following: { $ne: user._id } });

  return notFollowing
}
