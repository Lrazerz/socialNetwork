import axios, { AxiosError } from 'axios';
import { setAlert } from 'store/alerts/actions';
import { ApiRequestError, DevConnectorThunkDispatch } from 'store/common/types';

import { Comment, Like, Post } from './types';
import {
  PostsActionType,
  PostsCommentsLoadedAction,
  PostsLikesLoadedAction,
  PostsPostLoadedAction,
  PostsPostsErrorAction,
  PostsPostsLoadedAction,
  PostsPostsStartedLoadingAction,
} from './actionsTypes';

const _postsStartedLoading = (): PostsPostsStartedLoadingAction => {
  return { type: PostsActionType.PostsStartedLoading };
};

const _postsLoaded = (posts: Post[]): PostsPostsLoadedAction => {
  return { type: PostsActionType.PostsLoaded, posts };
};

const _postLoaded = (post: Post): PostsPostLoadedAction => {
  return { type: PostsActionType.PostLoaded, post };
};

const _postsError = (error: ApiRequestError): PostsPostsErrorAction => {
  return { type: PostsActionType.PostsError, error };
};

const _likesLoaded = (payload: { postId: string; likes: Like[] }): PostsLikesLoadedAction => {
  return { type: PostsActionType.LikesLoaded, payload };
};

// for single post
const _commentsLoaded = (comments: Comment[]): PostsCommentsLoadedAction => {
  return { type: PostsActionType.CommentsLoaded, comments };
};

export const getPosts = () => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_postsStartedLoading());
      const { data } = await axios.get<Post[]>('/api/posts');

      dispatch(_postsLoaded(data));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _postsError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const deletePost = (postId: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_postsStartedLoading());
      const { data } = await axios.delete<Post[]>(`/api/posts/${postId}`);

      dispatch(_postsLoaded(data));
      dispatch(setAlert('Post successfully deleted', 'success'));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _postsError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const addPost = (formData: FormData) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_postsStartedLoading());
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post<Post[]>(`/api/posts`, formData, config);

      dispatch(_postsLoaded(data));
      dispatch(setAlert('Post successfully created', 'success'));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _postsError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const getPost = (postId: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_postsStartedLoading());
      const { data } = await axios.get<Post>(`/api/posts/${postId}`);

      dispatch(_postLoaded(data));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _postsError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const addLike = (postId: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      const { data: likes } = await axios.put<Like[]>(`/api/posts/like/${postId}`);

      dispatch(_likesLoaded({ postId, likes }));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _postsError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const removeLike = (postId: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      const { data: likes } = await axios.put<Like[]>(`/api/posts/unlike/${postId}`);

      dispatch(_likesLoaded({ postId, likes }));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _postsError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const addComment = (postId: string, formData: FormData) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_postsStartedLoading());
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post<Comment[]>(
        `/api/posts/comment/${postId}`,
        formData,
        config,
      );

      dispatch(_commentsLoaded(data));
      dispatch(setAlert('Comment added', 'success'));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _postsError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};

export const removeComment = (postId: string, commentId: string) => {
  return async (dispatch: DevConnectorThunkDispatch) => {
    try {
      dispatch(_postsStartedLoading());
      const { data } = await axios.delete<Comment[]>(`/api/posts/comment/${postId}/${commentId}`);

      dispatch(_commentsLoaded(data));
    } catch (e) {
      if ((e as { isAxiosError?: boolean })?.isAxiosError) {
        const data = (e as AxiosError<{ errors: ApiRequestError[] }, unknown>)?.response?.data;

        if (data?.errors && data.errors.length) {
          data.errors.forEach(err => {
            console.log('foreach err', err);
            dispatch(setAlert(err.msg, 'danger'));
          });
        }

        dispatch(
          _postsError({
            msg: (e as AxiosError<unknown, unknown>).response?.statusText ?? '',
            status: (e as AxiosError<unknown, unknown>).response?.status ?? 400,
          }),
        );
      }
    }
  };
};
