import { FC } from 'react';
import { Link } from 'react-router-dom';

const GuestLinks: FC = () => (
  <ul>
    <li>
      <Link to="/profiles">Developers</Link>
    </li>
    <li>
      <Link to="/register">Register</Link>
    </li>
    <li>
      <Link to="/login">Login</Link>
    </li>
  </ul>
);

export default GuestLinks;
