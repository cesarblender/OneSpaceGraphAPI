import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import PostModel from "../../models/post";
import CommentModel from "../../models/comment";
import GetContextUser from "../../utils/getContextUser";

export default async function DeleteCommentController(root, args, context) {
  
    const user = GetContextUser(context);
    const { _id, postId } = args;
    console.log(args)

    const theCommentExists = await CommentModel.findOne({
      _id,
      author: user._id,
    });

    if (!theCommentExists) {
      throw new GraphQLError(ERRORS.COMMENT_NOT_FOUND);
    }

    const thePostExists = await PostModel.findOne({ _id: postId });

    if (!thePostExists) {
      throw new GraphQLError(ERRORS.Post_NOT_FOUND);
    }

    await PostModel.findByIdAndUpdate(postId, {
      $pullAll: {
        comments: [{ _id }],
      },
    });

    await CommentModel.findOneAndDelete({ _id });

    return true;
  
}
