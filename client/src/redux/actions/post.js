import axios from 'axios';
import {setAlert} from './alert';
import {COMMENTS_LOADED, LIKES_LOADED, POST_LOADED, POST_STARTED_LOADING, POSTS_ERROR, POSTS_LOADED} from "./types";

const _postsStartedLoading = () => {
  return {type: POST_STARTED_LOADING}
};

const _postsLoaded = (posts) => {
  return {type: POSTS_LOADED, posts};
};

const _postLoaded = (post) => {
  return {type: POST_LOADED, post};
};

const _postsError = (error) => {
  return {type: POSTS_ERROR, error};
};

const _likesLoaded = (payload) => {
  return {type: LIKES_LOADED, payload};
};

const _commentsLoaded = (comments) => {
  return {type: COMMENTS_LOADED, comments};
};

export const getPosts = () => {
  return async dispatch => {
    try {
      dispatch(_postsStartedLoading());
      const res = await axios.get('/api/posts');

      dispatch(_postsLoaded(res.data));
    }catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_postsError({msg: e.response.statusText, status: e.response.status}));
    }
  }
}

export const deletePost = id => {
  return async dispatch => {
    try {
      dispatch(_postsStartedLoading());
      const res = await axios.delete(`/api/posts/${id}`);

      dispatch(_postsLoaded(res.data));
      dispatch(setAlert('Post successfully deleted','success'));
    }catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_postsError({msg: e.response.statusText, status: e.response.status}));
    }
  }
}

export const addPost = formData => {
  return async dispatch => {
    try {
      dispatch(_postsStartedLoading());
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post(`/api/posts`, formData, config);

      dispatch(_postsLoaded(res.data));
      dispatch(setAlert('Post successfully created','success'));
    }catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_postsError({msg: e.response.statusText, status: e.response.status}));
    }
  }
}

export const getPost = id => {
  return async dispatch => {
    try {
      dispatch(_postsStartedLoading());
      const res = await axios.get(`/api/posts/${id}`);

      dispatch(_postLoaded(res.data));
    }catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_postsError({msg: e.response.statusText, status: e.response.status}));
    }
  }
}

export const addLike = postId => {
  return async dispatch => {
    try {
      console.log('addLike')
      const res = await axios.put(`/api/posts/like/${postId}`);

      dispatch(_likesLoaded({postId, likes: res.data}));
    }catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_postsError({msg: e.response.data.message, status: e.response.status}));
    }
  }
}

export const removeLike = postId => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);

      dispatch(_likesLoaded({postId, likes: res.data}));
    }catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_postsError({msg: e.response.statusText, status: e.response.status}));
    }
  }
}

export const addComment = (postId, formData) => {
  return async dispatch => {
    try {
      dispatch(_postsStartedLoading());
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

      dispatch(_commentsLoaded(res.data));
      dispatch(setAlert('Comment added', 'success'));
    }catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_postsError({msg: e.response.data.message, status: e.response.status}));
    }
  }
}

export const removeComment = (postId, commentId) => {
  return async dispatch => {
    try {
      dispatch(_postsStartedLoading());
      const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

      dispatch(_commentsLoaded(res.data));
    }catch (e) {
      const errors = e.response.data;
      if (errors.length > 0) {
        errors.forEach(err => {
          dispatch(setAlert(err.msg, 'danger'));
        })};
      dispatch(_postsError({msg: e.response.statusText, status: e.response.status}));
    }
  }
}