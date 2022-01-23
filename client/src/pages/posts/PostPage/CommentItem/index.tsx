// underscores
/* eslint-disable @typescript-eslint/naming-convention */
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { removeComment } from 'store/posts/actions';
import { Comment } from 'store/posts/types';
import { DevConnectorStore } from 'store/types';

type CommentItemProps = {
  comment: Comment;
  postId: string;
};

const CommentItem: FC<CommentItemProps> = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth: authStoreState }: DevConnectorStore) => authStoreState);

  const onCommentRemove = () => dispatch(removeComment(postId, comment._id));

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/${comment.user}`}>
          <img className="round-img" src={comment.avatar} alt="" />
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
        </p>
        {!auth.loading && comment.user === auth.user?._id && (
          <button className="btn btn-danger" onClick={onCommentRemove}>
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
