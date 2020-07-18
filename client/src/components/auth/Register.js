import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {setAlert} from '../../redux/actions/alert';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from "../../redux/actions/auth";

const Register = () => {
  // todo maybe with reducer
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const {name, email, password,password2} = formData;

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(({auth}) => auth.isAuthenticated);

  const onInputChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onFormSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
      return;
    }
    dispatch(registerUser(name, email, password));
  }

  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={e => onFormSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required
          value={name} onChange={e => onInputChange(e)}/>
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email"
          value={email} onChange={e => onInputChange(e)}/>
          <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onInputChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register"/>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  )
}

export default Register;