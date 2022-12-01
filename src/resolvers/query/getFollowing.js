import GetContextUser from "../../utils/getContextUser";

export default async function GetFollowingController(root, args, context) {
  let user = await GetContextUser(context).populate('following');
  return user.following
}
