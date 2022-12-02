import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import CommentModel from "../../models/comment";
import GetContextUser from "../../utils/getContextUser";

export default async function ToggleCommentLikeController(root, args, context) {
  
    const user = GetContextUser(context);

    const { _id } = args;

    const comment = await CommentModel.findOne({ _id: _id });

    if (!comment) {
      throw new GraphQLError(ERRORS.COMMENT_NOT_FOUND);
    }

    const commentLikes = await comment.populate({
      path: "likes",
      match: { _id: user._id },
    });

    if (commentLikes.likes.length > 0) {
      await CommentModel.findByIdAndUpdate(_id, {
        $pullAll: {
          likes: [{ _id: user._id }],
        },
      });
      return false;
    }

    await CommentModel.findByIdAndUpdate(_id, {
      $push: {
        likes: user._id,
      },
    });

    return true;
  
}
