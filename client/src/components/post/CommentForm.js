import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addComment} from "../../redux/actions/post";

const CommentForm = ({postId}) => {
  const dispatch = useDispatch();

  const [text,setText] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(addComment(postId, {text}));
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onFormSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Type here"
            required
            value={text}
            onChange={e => setText(e.target.value)}/>
        <input type="submit" className="btn btn-dark my-1" value="Submit"/>
      </form>
    </div>
  )
}

export default CommentForm;