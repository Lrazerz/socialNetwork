import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, deletePost, removeLike } from '../../redux/actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions = true,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

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
              <i className="fas fa-thumbs-up"></i> {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => dispatch(removeLike(_id))}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => dispatch(deletePost(_id))}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostItem;
