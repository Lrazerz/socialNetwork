import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { DevConnectorStore } from 'store/types';
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';

const NavBar: FC = () => {
  const { isAuthenticated, loading } = useSelector(({ auth }: DevConnectorStore) => auth);

  const Links = isAuthenticated ? AuthLinks : GuestLinks;

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" />
          DevConnector
        </Link>
      </h1>
      {!loading && <Links />}
    </nav>
  );
};

export default NavBar;
