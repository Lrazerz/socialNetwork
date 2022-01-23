import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DevConnectorStore } from 'store/types';
import { getGithubRepos } from 'store/profiles/actions';
import Spinner from 'components/layout/Spinner';

type ProfileGithubProps = {
  username: string;
};

const ProfileGithub: FC<ProfileGithubProps> = ({ username }) => {
  const dispatch = useDispatch();

  const { repos, loading } = useSelector(({ profiles }: DevConnectorStore) => profiles);

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [dispatch, username]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos.map(repo => (
        <div key={repo._id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
              <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
              <li className="badge badge-light">Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileGithub;
