import { FC } from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';

import { deleteEducation } from 'store/profiles/actions';
import { ProfileEducation } from 'store/profiles/types';

type EducationProps = {
  education: ProfileEducation[];
};

// todo type
const DashboardEducation: FC<EducationProps> = ({ education }) => {
  const dispatch = useDispatch();

  const educations = education.map(edu => (
    <tr key={edu.id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to ? <Moment format="YYYY/MM/DD/">{edu.to}</Moment> : ' Now'}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => dispatch(deleteEducation(edu._id))}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Eductaion Credentials</h2>
      {education.length < 1 ? (
        <p className="lead">User hasn't added education yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      )}
    </>
  );
};

export default DashboardEducation;
