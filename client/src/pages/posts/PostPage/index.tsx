import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { DevConnectorStore } from 'store/types';
import { getPost } from 'store/posts/actions';
import Spinner from 'components/layout/Spinner';

import PostItem from '../common/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const PostPage: FC = () => {
  const dispatch = useDispatch();

  const { id = '' } = useParams<{ id: string }>();

  const { post, loading } = useSelector(({ posts }: DevConnectorStore) => posts);

  useEffect(() => {
    dispatch(getPost(id ?? ''));
  }, [dispatch, id]);

  if (loading || !post) {
    return <Spinner />;
  }
  return (
    <div>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem showActions={false} post={post} />
      <CommentForm postId={id ?? ''} />
      <div className="comments">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
