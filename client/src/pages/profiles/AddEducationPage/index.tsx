import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addEducation } from 'store/profiles/actions';

const AddEducationPage: FC = () => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateEnabled, setToDateEnabled] = useState(true);

  const dispatch = useDispatch();

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onCurrentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, current: e.target.checked, to: '' });
    setToDateEnabled(prev => !prev);
  };

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addEducation(formData));
  };

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any school/bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onFormSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onInputChange} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" checked={current} onChange={onCurrentChange} />{' '}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onInputChange}
            disabled={!toDateEnabled}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols={30}
            rows={5}
            placeholder="Program Description"
            value={description}
            onChange={onInputChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddEducationPage;
