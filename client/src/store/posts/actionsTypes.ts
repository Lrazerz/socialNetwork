import { ApiRequestError } from 'store/common/types';
import { Comment, Like, Post } from './types';

export enum PostsActionType {
  PostsStartedLoading = 'POSTS_STARTED_LOADING',

  PostsLoaded = 'POSTS_LOADED',
  PostLoaded = 'POST_LOADED',
  PostsError = 'POSTS_ERROR',

  LikesLoaded = 'LIKES_LOADED',
  CommentsLoaded = 'COMMENTS_LOADED',
}

export type PostsPostsStartedLoadingAction = {
  type: PostsActionType.PostsStartedLoading;
};

export type PostsPostsLoadedAction = {
  type: PostsActionType.PostsLoaded;
  posts: Post[];
};

export type PostsPostLoadedAction = {
  type: PostsActionType.PostLoaded;
  post: Post;
};

export type PostsPostsErrorAction = {
  type: PostsActionType.PostsError;
  error: ApiRequestError;
};

export type PostsLikesLoadedAction = {
  type: PostsActionType.LikesLoaded;
  payload: {
    postId: string;
    likes: Like[];
  };
};

export type PostsCommentsLoadedAction = {
  type: PostsActionType.CommentsLoaded;
  comments: Comment[];
};

export type PostsAnyAction =
  | PostsPostsStartedLoadingAction
  | PostsPostsLoadedAction
  | PostsPostLoadedAction
  | PostsPostsErrorAction
  | PostsLikesLoadedAction
  | PostsCommentsLoadedAction;
