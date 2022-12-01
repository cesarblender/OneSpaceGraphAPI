import GetContextUser from "../../utils/getContextUser";

export default async function SetProfilePictureController(root, args, context) {
  const user = GetContextUser(context);

  const { profilePicture } = args;

  user.profilePicture = profilePicture;
  await user.save();

  return user;
}
