import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createUpdateProfile, getCurrentProfile } from 'store/profiles/actions';
import { DevConnectorStore } from 'store/types';
import Spinner from 'components/layout/Spinner';

const EditProfilePage: FC = () => {
  const [formData, setFormData] = useState({
    bio: '',
    company: '',
    skills: '',
    website: '',
    location: '',
    status: '',
    githubusername: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
  });

  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);

  const dispatch = useDispatch();
  const { profile, loading } = useSelector(({ profiles }: DevConnectorStore) => profiles);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    setFormData({
      company: profile?.company ?? '',
      website: profile?.website ?? '',
      location: profile?.location ?? '',
      status: profile?.status ?? '',
      // todo check skills type
      skills: profile?.skills ?? '',
      githubusername: profile?.githubusername ?? '',
      bio: profile?.bio ?? '',
      linkedin: profile?.social.linkedin ?? '',
      facebook: profile?.social.facebook ?? '',
      instagram: profile?.social.instagram ?? '',
      twitter: profile?.social.twitter ?? '',
      youtube: profile?.social.youtube ?? '',
    });
  }, [profile]);

  const onValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    // todo check
    // can't use functional form setFormData(prev => ...), https://reactjs.org/docs/events.html#event-pooling
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUpdateProfile(formData, true));
  };

  // todo loading handle
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information to make your profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onFormSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onValueChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onValueChange}
          />
          <small className="form-text">Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onValueChange}
          />
          <small className="form-text">Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onValueChange}
          />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onValueChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onValueChange}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onValueChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => setDisplaySocialInputs(state => !state)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onValueChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onValueChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onValueChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onValueChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onValueChange}
              />
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default EditProfilePage;
