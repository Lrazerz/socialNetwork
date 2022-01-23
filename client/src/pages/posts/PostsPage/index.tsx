import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from 'store/posts/actions';
import { DevConnectorStore } from 'store/types';
import Spinner from 'components/layout/Spinner';

import PostItem from '../common/PostItem';
import PostForm from './PostForm';

const PostsPage: FC = () => {
  const dispatch = useDispatch();

  const { posts, loading } = useSelector(
    ({ posts: storePostsState }: DevConnectorStore) => storePostsState,
  );

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.length > 0 ? (
          posts.map(post => <PostItem key={post._id} post={post} />)
        ) : (
          <>
            <i className="far fa-frown fa-2x" />
            <span className="lead"> No posts yet</span>
          </>
        )}
      </div>
    </>
  );
};

export default PostsPage;
