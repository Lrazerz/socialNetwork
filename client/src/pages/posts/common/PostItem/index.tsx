// to allow underscore _id
/* eslint-disable @typescript-eslint/naming-convention */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';

import { addLike, deletePost, removeLike } from 'store/posts/actions';
import { Post } from 'store/posts/types';
import { DevConnectorStore } from 'store/types';

type PostItemProps = {
  post: Post;
  showActions?: boolean;
};

const PostItem: FC<PostItemProps> = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions = true,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth: authStoreState }: DevConnectorStore) => authStoreState);

  // todo check
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/${user}`}>
          <img className="round-img" src={avatar} alt="avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && (
          <>
            <button type="button" className="btn btn-light" onClick={() => dispatch(addLike(_id))}>
              <i className="fas fa-thumbs-up" /> {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => dispatch(removeLike(_id))}
            >
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
            </Link>
            {/* todo check if user has _id prop, was {!auth.loading && user === auth.user?._id && ( */}
            {!auth.loading && user === auth.user?._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => dispatch(deletePost(_id))}
              >
                <i className="fas fa-times" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostItem;
