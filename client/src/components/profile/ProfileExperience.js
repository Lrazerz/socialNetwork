import React from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({experience}) => {
  const {company, title, location, current, from, to, description} = experience;

  return (
    <>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </>
  )
}

export default ProfileExperience;