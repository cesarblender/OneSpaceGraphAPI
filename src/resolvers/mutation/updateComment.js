import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import CommentModel from "../../models/comment";
import GetContextUser from "../../utils/getContextUser";

export default async function UpdateCommentController(root, args, context) {
  
    const user = GetContextUser(context);
    const { _id, content } = args;

    if (content.length < 1) {
      throw new GraphQLError(ERRORS.COMMENT_MUST_HAVE_CONTENT);
    }

    const theCommentExists = CommentModel.findOne({ _id, author: user._id });

    if (!theCommentExists) {
      throw new GraphQLError(ERRORS.COMMENT_NOT_FOUND);
    }

    const comment = await CommentModel.findOneAndUpdate({ _id }, { content });

    return comment;
  
}
