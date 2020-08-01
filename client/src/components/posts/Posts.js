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
  console.log('posts length',posts);
  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <i className="lead">
        <i className="fas fa-user"></i> Welcome to the comunity
      </i>
      <PostForm />
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post}/>
        ))}
      </div>
    </>
  )
}

export default Posts;