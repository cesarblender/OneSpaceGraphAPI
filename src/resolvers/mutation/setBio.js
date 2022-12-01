import GetContextUser from "../../utils/getContextUser";

export default async function SetBioController(root, args, context) {
  const user = GetContextUser(context);

  const { bio } = args;

  user.bio = bio;
  await user.save();

  return user;
}
