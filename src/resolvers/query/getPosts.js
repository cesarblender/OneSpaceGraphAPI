import PostModel from "../../models/post";
import GetContextUser from "../../utils/getContextUser";

export default async function GetPostsController(root, args, context) {
  const user = GetContextUser(context);

  const posts = await PostModel.find({ author: { $in: user.following } }).sort({
    'likes_count': -1,
    'comments_count': -1,
    createdAt: -1,
  });

  if (user.following.length === 0 || post.length === 0) {
    const allPosts = await PostModel.find().sort({
      'likes_count': -1,
      'comments_count': -1,
      createdAt: -1,
    });
    return allPosts;
  }

  return posts;
}
