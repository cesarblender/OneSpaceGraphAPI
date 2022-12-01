import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import PostModel from "../../models/post";
import GetContextUser from "../../utils/getContextUser";

export default async function UpdatePostController(root, args, context) {
  try {
    const user = GetContextUser(context);
    const { _id, content } = args;

    if (content.length < 1) {
      throw new GraphQLError(ERRORS.POST_MUST_HAVE_CONTENT);
    }

    const thePostExists = PostModel.findOne({ _id, author: user._id });

    if (!thePostExists) {
      throw new GraphQLError(ERRORS.POST_NOT_FOUND);
    }

    const post = await PostModel.findOneAndUpdate({ _id }, { content });

    return post;
  } catch (err) {
    return { error: err.message };
  }
}
