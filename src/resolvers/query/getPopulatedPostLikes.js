import PostModel from "../../models/post";
import GetContextUser from "../../utils/getContextUser";

export default async function GetPopulatedPostLikesController(root, args, context) {
  GetContextUser(context);

  const { _id } = args;

  const post = await PostModel.findById(_id).populate('likes');

  return post.likes;
}
