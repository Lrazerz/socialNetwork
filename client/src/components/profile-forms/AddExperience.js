import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addExperience} from "../../redux/actions/profile";

const AddExperience = () => {

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateEnabled, setToDateEnabled] = useState(true);

  const dispatch = useDispatch();

  const {company, title, location, from, to, current, description} = formData;

  const onCurrentChange = e => {
    setFormData({...formData, current: e.target.checked, to: ''});
    setToDateEnabled(prev => !prev);
  }

  const onInputChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(addExperience(formData));
  }

  return (
    <>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"/> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onFormSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title}
                 onChange={e => onInputChange(e)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company}
                 onChange={e => onInputChange(e)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location}
                 onChange={e => onInputChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from}
                 onChange={e => onInputChange(e)}/>
        </div>
        <div className="form-group">
          <p><input type="checkbox" name="current" checked={current}
                    onChange={e => onCurrentChange(e)}/>{' '}Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to}
                 onChange={e => onInputChange(e)} disabled={!toDateEnabled}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => onInputChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1"/>
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </>
  )
}

export default AddExperience;