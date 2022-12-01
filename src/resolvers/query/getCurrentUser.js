import GetContextUser from "../../utils/getContextUser";

export default function GetCurrentUserController(root, args, context) {
  const user = GetContextUser(context);
  return user;
}
