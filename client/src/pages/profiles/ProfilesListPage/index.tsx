import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProfiles } from 'store/profiles/actions';
import { DevConnectorStore } from 'store/types';
import Spinner from 'components/layout/Spinner';
import ProfileItem from './ListItem';

// todo rename? to List
const ProfilesListPage: FC = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(
    ({ profiles: profilesStoreState }: DevConnectorStore) => profilesStoreState,
  );

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <p className="lead">
            <i className="fab fa-connectdevelop" />
            {' Browse and connect with developers'}
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProfilesListPage;
