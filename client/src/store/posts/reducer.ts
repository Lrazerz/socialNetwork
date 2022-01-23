import { PostsActionType, PostsAnyAction } from './actionsTypes';
import { postsInitialState } from './initialState';

// eslint-disable-next-line @typescript-eslint/default-param-last
export const postsReducer = (state = postsInitialState, action: PostsAnyAction) => {
  switch (action.type) {
    case PostsActionType.PostsStartedLoading:
      return {
        ...state,
        loading: true,
      };
    case PostsActionType.PostsLoaded:
      return {
        ...state,
        posts: action.posts,
        loading: false,
      };
    case PostsActionType.PostLoaded:
      return {
        ...state,
        post: action.post,
        loading: false,
      };
    case PostsActionType.PostsError:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case PostsActionType.LikesLoaded:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.postId ? { ...post, likes: action.payload.likes } : post,
        ),
        loading: false,
      };
    case PostsActionType.CommentsLoaded:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.comments,
        },
        loading: false,
      };
    default:
      return state;
  }
};
