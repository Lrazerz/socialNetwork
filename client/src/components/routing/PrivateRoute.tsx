import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DevConnectorStore } from 'store/types';
import Spinner from 'components/layout/Spinner';

const PrivateRoute: FC = () => {
  const { isAuthenticated, loading } = useSelector(({ auth }: DevConnectorStore) => auth);

  if (loading) return <Spinner />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
