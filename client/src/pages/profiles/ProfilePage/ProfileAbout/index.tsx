import React, { FC } from 'react';
import { Profile } from 'store/profiles/types';

type ProfileAboutProps = {
  profile: Profile;
};

const ProfileAbout: FC<ProfileAboutProps> = ({ profile }) => {
  const {
    bio,
    skills,
    user: { name },
  } = profile;

  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <>
          <h2 className="text-primary">{name.trim().split(' ')[1]}s Bio</h2>
          <p>{bio}</p>
        </>
      )}

      <div className="line" />
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div className="p-1" key={index}>
            <i className="fas fa-check" /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
