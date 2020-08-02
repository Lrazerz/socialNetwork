import React from 'react';

const ProfileAbout = ({profile}) => {
  const {bio, skills, user: {name}} = profile;

  return (
    <div className="profile-about bg-light p-2">
      {
        bio && (
          <>
            <h2 className="text-primary">{name.trim().split(' ')[1]}s Bio</h2>
            <p>
              {bio}
            </p>
          </>
        )
      }

      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {
          skills.map((skill, index) => (
            <div className='p-1' key={index}>
              <i className="fas fa-check"></i> {skill}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ProfileAbout;