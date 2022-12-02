import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import PostModel from "../../models/post";
import UserModel from "../../models/user";
import GetContextUser from "../../utils/getContextUser";

export default async function DeletePostController(root, args, context) {
  
    const user = GetContextUser(context);
    const { _id } = args;

    const thePostExists = await PostModel.findOne({ _id, author: user._id });

    if (!thePostExists) {
      throw new GraphQLError(ERRORS.POST_NOT_FOUND);
    }

    await PostModel.findOneAndDelete({ _id });

    await UserModel.findByIdAndUpdate(user._id, {
      $pullAll: {
        posts: [{ _id }],
      },
    });

    return true;
  
}
