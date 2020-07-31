import React, {useEffect} from 'react';
import {getProfileById} from '../../redux/actions/profile';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from 'react-router-dom';
import ProfileTop from './ProfileTop'
import Spinner from "../layout/Spinner";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const Profile = () => {
  const dispatch = useDispatch();
  const {profile: {profile, loading}, auth} = useSelector(state => state);

  const {id} = useParams();

  useEffect(() => {
    id && dispatch(getProfileById(id));
  }, [dispatch, id]);

  return (
    <>
      {!profile || loading ? <Spinner/> :
        (
          <>
            <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
            )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile}/>
              <ProfileAbout profile={profile}/>
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {
                  profile.experience.length > 0 ? (
                    <>
                      {profile.experience.map(exp => (
                        <ProfileExperience key={exp._id} experience={profile.experience}/>
                      ))}
                    </>
                  ) : (<h4>No experience credentials</h4>)
                }
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {
                  profile.education.length > 0 ? (
                    <>
                      {profile.education.map(edu => (
                        <ProfileEducation key={edu._id} educaiton={profile.education}/>
                      ))}
                    </>
                  ) : (<h4>No education credentials</h4>)
                }
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Profile;