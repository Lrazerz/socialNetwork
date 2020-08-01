import React from 'react';
import {Link} from 'react-router-dom';
import {logoutUser} from "../../redux/actions/auth";
import {useDispatch, useSelector} from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, loading} = useSelector(({auth}) => auth);

  // navigation links when authenticated
  // .hide-sm - hides children on small screens
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          Developers
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          Posts
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{` `}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/" onClick={() => dispatch(logoutUser())}>
          <i className='fas fa-sign-out-alt'></i>{` `}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" />
          DevConnector
        </Link>
      </h1>
      { !loading && (<>{isAuthenticated ? authLinks : guestLinks}</>) }
    </nav>
  )
}

export default Navbar;