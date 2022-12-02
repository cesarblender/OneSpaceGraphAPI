import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import PostModel from "../../models/post";
import GetContextUser from "../../utils/getContextUser";

export default async function CreatePostController(root, args, context) {
  
    const user = GetContextUser(context);
    const { image, content } = args.post;

    if (!image && content.length < 1) {
      throw new GraphQLError(ERRORS.POST_MUST_HAVE_CONTENT);
    }

    const newPost = new PostModel();
    newPost.content = content;
    newPost.image = image;
    newPost.author = user.id;
    await newPost.save();

    user.posts.push(newPost);
    await user.save();

    return newPost;
  
}
