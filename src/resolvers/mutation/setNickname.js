import GetContextUser from "../../utils/getContextUser";

export default async function SetNicknameController(root, args, context) {
  const user = GetContextUser(context);

  const { nickname } = args;

  user.nickname = nickname;
  await user.save();

  return user;
}
