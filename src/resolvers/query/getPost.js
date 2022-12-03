import PostModel from "../../models/post";
import GetContextUser from "../../utils/getContextUser";

export default async function GetPostController(root, args, context) {
  GetContextUser(context);

  const {_id} = args

  const post = await PostModel.findById(_id);

  return post;
}
