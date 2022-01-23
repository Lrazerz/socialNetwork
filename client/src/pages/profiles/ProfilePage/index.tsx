import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { DevConnectorStore } from 'store/types';
import { getProfileById } from 'store/profiles/actions';
import Spinner from 'components/layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const {
    profiles: { profile, loading },
    auth,
  } = useSelector((state: DevConnectorStore) => state);

  const { id = '' } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getProfileById(id));
    }
  }, [dispatch, id]);

  // todo check
  if (loading) {
    return <Spinner />;
  }

  if (!profile) {
    return (
      <>
        <Link to="/posts" className="btn my-2">
          Back To Posts
        </Link>
        <p className="lead">
          <i className="fas fa-address-book" />
          {' User has not configured a profile yet'}
        </p>
      </>
    );
  }

  const isCurrentUserProfile =
    !auth.loading && auth.isAuthenticated && auth.user?._id === profile.user._id;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {isCurrentUserProfile && (
            <Link to="/edit-profile" className="btn btn-dark">
              {' '}
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map(exp => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map(edu => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
