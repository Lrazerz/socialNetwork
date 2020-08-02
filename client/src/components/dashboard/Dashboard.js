import React, {useEffect} from 'react';
import {deleteAccount, getCurrentProfile} from '../../redux/actions/profile';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";


const Dashboard = () => {
  const dispatch = useDispatch();
  const {user, loading: authLoading} = useSelector(({auth}) => auth);
  const {profile, loading: profileLoading} = useSelector(({profile}) => profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const renderData = (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'/>
        Welcome {user && user.name}
      </p>
      {profile ?
        <>
          <DashboardActions/>
          <Experience experience={profile.experience}/>
          <Education education={profile.education}/>
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
              <i className="fas fa-user-minus"/>{' '}Delete my account
            </button>
          </div>
        </> :
        (
          <>
            <p>You have no setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create profile
            </Link>
          </>
        )
      }
    </>
  );

  return (profileLoading || authLoading) ? <Spinner/> : renderData;
}

export default Dashboard;