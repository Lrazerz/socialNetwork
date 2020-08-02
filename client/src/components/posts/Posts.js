import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../redux/actions/post";
import Spinner from "../layout/Spinner";
import PostItem from './PostItem';
import PostForm from "./PostForm";

const Posts = () => {
  const dispatch = useDispatch();
  const {posts, loading} = useSelector(({post}) => post);

  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts]);

  if (loading) {
    return <Spinner/>
  }
  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      <PostForm/>
      <div className="posts">
        {
          posts.length > 0 ? (posts.map(post => (
            <PostItem key={post._id} post={post}/>
          ))) : (
            <>
              <i className='far fa-frown fa-2x'/>
              <span className='lead'> No posts yet</span>
            </>
          )
        }
      </div>
    </>
  )
}

export default Posts;