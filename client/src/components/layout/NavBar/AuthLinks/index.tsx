import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from 'store/auth/actions';

const AuthLinks: FC = () => {
  const dispatch = useDispatch();

  return (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          {` `}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/" onClick={() => dispatch(logoutUser())}>
          <i className="fas fa-sign-out-alt" />
          {` `}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
};

export default AuthLinks;
