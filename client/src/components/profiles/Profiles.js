import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllProfiles} from "../../redux/actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const dispatch = useDispatch();
  const {profiles, loading} = useSelector(({profile}) => profile);

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  return (
    <>
      {loading ? <Spinner/> :
        (
          <>
            <p className="lead">
              <i className="fab fa-connectdevelop"></i>
              {' Browse and connect with developers'}
            </p>
            <div className="profiles">
              {profiles.length > 0 ? profiles.map(profile => <ProfileItem key={profile._id} profile={profile}/>) :
                <h4>No profiles found...</h4>}
            </div>
          </>
        )
      }
    </>
  )
}

export default Profiles;