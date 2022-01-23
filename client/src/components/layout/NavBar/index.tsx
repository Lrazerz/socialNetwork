import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { DevConnectorStore } from 'store/types';
import Spinner from 'components/layout/Spinner';

import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';

const NavBar: FC = () => {
  const { isAuthenticated, loading } = useSelector(({ auth }: DevConnectorStore) => auth);

  if (loading) {
    return <Spinner />;
  }

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" />
          DevConnector
        </Link>
      </h1>
      {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
    </nav>
  );
};

export default NavBar;
