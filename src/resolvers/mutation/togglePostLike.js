import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import PostModel from "../../models/post";
import GetContextUser from "../../utils/getContextUser";

export default async function TogglePostLikeController(root, args, context) {
  try {
    const user = GetContextUser(context);

    const { _id } = args;

    const post = await PostModel.findOne({ _id: _id });

    if (!post) {
      throw new GraphQLError(ERRORS.POST_NOT_FOUND);
    }

    const postLikes = await post.populate({
      path: "likes",
      match: { _id: user._id },
    });

    if (postLikes.likes.length > 0) {
      await PostModel.findByIdAndUpdate(_id, {
        $pullAll: {
          likes: [{ _id: user._id }],
        },
      });
      return false;
    }

    await PostModel.findByIdAndUpdate(_id, {
      $push: {
        likes: user._id,
      },
    });

    return true;
  } catch (err) {
    return { error: err.message };
  }
}
