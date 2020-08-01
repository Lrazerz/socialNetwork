import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPost} from "../../redux/actions/post";
import {Link, useParams} from 'react-router-dom';
import PostItem from "../posts/PostItem";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from './CommentItem';

const Post = () => {
  const dispatch = useDispatch();

  const {id} = useParams();

  // props.match? id
  const {post, loading} = useSelector(({post}) => post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [getPost, id]);

  if (loading || post === null) {
    return <Spinner/>;
  }
  return (
    <div>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem showActions={false} post={post}/>
      <CommentForm postId={id}/>
      <div className="comments">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </div>
  )
}

export default Post;