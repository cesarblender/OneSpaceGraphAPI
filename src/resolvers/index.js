// Queries
import GetCurrentUserController from "./query/getCurrentUser";
import GetFollowingController from "./query/getFollowing";
import GetNotFollowingController from "./query/getNotFollowing";
import GetPopulatedPostLikesController from "./query/getPopulatedPostLikes";
import GetCommentController from "./query/getComment";
import GetPostCommentsController from "./query/getPostComments";
import GetPostLikesController from "./query/getPostLikes";
import GetPostsController from "./query/getPosts";
import GetUserController from "./query/getUser";

// Mutations
import ConfirmEmailController from "./mutation/confirmEmail";
import CreateCommentController from "./mutation/createComment";
import CreatePostController from "./mutation/createPost";
import DeleteCommentController from "./mutation/deleteComment";
import DeletePostController from "./mutation/deletePost";
import LoginController from "./mutation/login";
import RegisterController from "./mutation/register";
import ToggleCommentLikeController from "./mutation/toggleCommentLike";
import TogglePostLikeController from "./mutation/togglePostLike";
import UpdateCommentController from "./mutation/updateComment";
import UpdatePostController from "./mutation/updatePost";
import SetBioController from "./mutation/setBio";
import GetPostController from "./query/getPost";

const resolvers = {
  Query: {
    hello(root, args, context) {
      return "hello";
    },
    getCurrentUser: GetCurrentUserController,
    getUser: GetUserController,
    getFollowing: GetFollowingController,
    getNotFollowing: GetNotFollowingController,
    getPosts: GetPostsController,
    getPostComments: GetPostCommentsController,
    getComment: GetCommentController,
    getPostLikes: GetPostLikesController,
    getPopulatedPostLikes: GetPopulatedPostLikesController,
    getPost: GetPostController,
  },
  Mutation: {
    register: RegisterController,
    confirmEmail: ConfirmEmailController,
    login: LoginController,
    createPost: CreatePostController,
    updatePost: UpdatePostController,
    deletePost: DeletePostController,
    createComment: CreateCommentController,
    updateComment: UpdateCommentController,
    deleteComment: DeleteCommentController,
    togglePostLike: TogglePostLikeController,
    toggleCommentLike: ToggleCommentLikeController,
    setBio: SetBioController,
  },
};

export default resolvers;
