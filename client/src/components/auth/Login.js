import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from '../../redux/actions/auth';
import {Redirect} from "react-router-dom";
import Spinner from "../layout/Spinner";

const Login = () => {
  // todo maybe with reducer
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {email, password} = formData;

  const dispatch = useDispatch();
  const {isAuthenticated, loading} = useSelector(({auth}) => auth);

  const onInputChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onFormSubmit = async e => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }

  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  if(loading) {
    return <Spinner/>;
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={e => onFormSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email"
                 value={email} onChange={e => onInputChange(e)}/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onInputChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login"/>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  )
}

export default Login;