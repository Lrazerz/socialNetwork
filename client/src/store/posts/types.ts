// for double underscores
/* eslint-disable @typescript-eslint/naming-convention */
import { ApiRequestError } from 'store/common/types';

export type Like = {
  _id: string;
  user: string;
};

export type Comment = {
  _id: string;
  name: string;
  text: string;
  user: string;
  avatar: string;
  date: string;
};

export type Post = {
  _id: string;
  __v: number;
  name: string;
  text: string;
  likes: Like[];
  comments: Comment[];
  user: string;
  avatar: string;
  date: string;
};

export type PostsState = {
  posts: Post[];
  post?: Post;
  loading: boolean;
  error?: ApiRequestError;
};
