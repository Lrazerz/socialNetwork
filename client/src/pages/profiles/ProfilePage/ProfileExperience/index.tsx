import React, { FC } from 'react';
import Moment from 'react-moment';
import { ProfileExperience as ProfileExperienceType } from 'store/profiles/types';

type ProfileExperienceProps = {
  experience: ProfileExperienceType;
};

const ProfileExperience: FC<ProfileExperienceProps> = ({ experience }) => {
  const { company, title, from, to, description } = experience;

  return (
    <>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </>
  );
};

export default ProfileExperience;
