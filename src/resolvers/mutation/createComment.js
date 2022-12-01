import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import PostModel from "../../models/post";
import CommentModel from "../../models/comment";
import GetContextUser from "../../utils/getContextUser";

export default async function CreateCommentController(root, args, context) {
  try {
    const user = GetContextUser(context);
    const { postId, comment } = args;

    if (comment.content.length < 1) {
      throw new GraphQLError(ERRORS.POST_MUST_HAVE_CONTENT);
    }

    const post = await PostModel.findOne({ _id: postId });

    if (!post) {
      throw new GraphQLError(ERRORS.POST_NOT_FOUND);
    }

    const newComment = new CommentModel();
    newComment.content = comment.content;
    newComment.author = user._id;
    newComment.post = postId;
    await newComment.save();

    post.comments.push(newComment);
    await post.save();

    return newComment;
  } catch (err) {
    return { error: err.message };
  }
}
