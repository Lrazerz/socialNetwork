import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {createUpdateProfile, getCurrentProfile} from "../../redux/actions/profile";
import {useDispatch, useSelector} from "react-redux";

const EditProfile = props => {
  const [formData, setFormData] = useState({
    company: null,
    website: null,
    location: null,
    status: '',
    skills: null,
    githubusername: null,
    bio: null,
    twitter: null,
    facebook: null,
    linkedin: null,
    youtube: null,
    instagram: null,
  })

  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);

  const dispatch = useDispatch();
  const {profile, loading} = useSelector(({profile}) => profile)

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
    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills,
      githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  },[profile]);

  const onValueChange = e => {
    // can't use functional form setFormData(prev => ...), https://reactjs.org/docs/events.html#event-pooling
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(createUpdateProfile(formData, true))
  }

  return (
    <>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onFormSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onValueChange(e)}>
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
          <small className="form-text"
          >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e => onValueChange(e)}/>
          <small className="form-text"
          >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e => onValueChange(e)}/>
          <small className="form-text"
          >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onValueChange(e)}/>
          <small className="form-text"
          >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onValueChange(e)}/>
          <small className="form-text"
          >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={e => onValueChange(e)}
          />
          <small className="form-text"
          >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio}
                    onChange={e => onValueChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={() => setDisplaySocialInputs(state => !state)}
                  type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter}
                     onChange={e => onValueChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook}
                     onChange={e => onValueChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube}
                     onChange={e => onValueChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin}
                     onChange={e => onValueChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram}
                     onChange={e => onValueChange(e)}/>
            </div>
          </>)}
        <input type="submit" className="btn btn-primary my-1"/>
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </>
  )
};

export default EditProfile;