import { FC } from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';

import { deleteExperience } from 'store/profiles/actions';
import { ProfileExperience } from 'store/profiles/types';

type ExperienceProps = {
  experience: ProfileExperience[];
};

const Experience: FC<ExperienceProps> = ({ experience }) => {
  const dispatch = useDispatch();

  // todo name?
  const onDeleteExperience = (experienceServerId: string) => {
    dispatch(deleteExperience(experienceServerId));
  };

  const experiences = experience.map(exp => (
    <tr key={exp.id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to ? <Moment format="YYYY/MM/DD/">{exp.to}</Moment> : ' Now'}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDeleteExperience(exp._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      {experience.length < 1 ? (
        <p className="lead">User hasn't added experience yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      )}
    </>
  );
};

export default Experience;
