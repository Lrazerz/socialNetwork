import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeComment } from '../../redux/actions/post';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const CommentItem = ({ comment: { _id, text, name, avatar, user, date }, postId }) => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  const onCommentRemove = () => dispatch(removeComment(postId, _id));

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button className="btn btn-danger" onClick={onCommentRemove}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
