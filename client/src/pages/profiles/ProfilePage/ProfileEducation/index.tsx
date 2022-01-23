import React, { FC } from 'react';
import Moment from 'react-moment';
import { ProfileEducation as ProfileEducationType } from 'store/profiles/types';

type ProfileEducationProps = {
  education: ProfileEducationType;
};

const ProfileEducation: FC<ProfileEducationProps> = ({ education }) => {
  const { school, degree, fieldofstudy, from, to, description } = education;

  return (
    <>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </>
  );
};

export default ProfileEducation;
