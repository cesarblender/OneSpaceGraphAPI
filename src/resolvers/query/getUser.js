import UserModel from "../../models/user";
import GetContextUser from "../../utils/getContextUser";

export default async function GetUserController(root, args, context) {
  GetContextUser(context);

  const { _id } = args;

  const user = await UserModel.findById(_id);

  return user;
}
