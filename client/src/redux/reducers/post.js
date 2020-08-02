import {
  COMMENTS_LOADED,
  LIKES_LOADED, POST_LOADED, POST_STARTED_LOADING,
  POSTS_ERROR, POSTS_LOADED
} from "../actions/types";

// maybe isAuthenticated should be true
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_STARTED_LOADING:
      return {
        ...state,
        loading: true
      }
    case POSTS_LOADED:
      return {
        ...state,
        posts: action.posts,
        loading: false
      }
    case POST_LOADED:
      return {
        ...state,
        post: action.post,
        loading: false
      }
    case POSTS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case LIKES_LOADED:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload.postId ? {...post, likes: action.payload.likes} : post),
        loading: false
      }
    case COMMENTS_LOADED:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.comments
        },
        loading: false
      }
    default:
      return state;
  }
}