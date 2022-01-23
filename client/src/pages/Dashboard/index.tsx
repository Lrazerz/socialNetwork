import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile, deleteAccount } from 'store/profiles/actions';
import { DevConnectorStore } from 'store/types';
import Spinner from 'components/layout/Spinner';

import DashboardActions from './Actions';
import DashboardExperience from './Experience';
import DashboardEducation from './Education';

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector(({ auth }: DevConnectorStore) => auth);
  const { profile, loading: profileLoading } = useSelector(
    ({ profiles }: DevConnectorStore) => profiles,
  );

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const renderData = (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome, {user?.name ?? ''}
      </p>
      {profile ? (
        <>
          <DashboardActions />
          <DashboardExperience experience={profile.experience} />
          <DashboardEducation education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
              <i className="fas fa-user-minus" /> Delete my account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have no setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </>
      )}
    </>
  );

  return profileLoading || authLoading ? <Spinner /> : renderData;
};

export default Dashboard;
