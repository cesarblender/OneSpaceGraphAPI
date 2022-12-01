import CommentModel from "../../models/comment";
import GetContextUser from "../../utils/getContextUser";

export default async function GetPostCommentsController(root, args, context) {
  GetContextUser(context);
  const { _id } = args;

  const comments = await CommentModel.find({ post: _id }).sort({
    createdAt: -1,
  });

  return comments;
}
