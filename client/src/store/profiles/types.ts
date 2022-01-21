// for double underscores
/* eslint-disable @typescript-eslint/naming-convention */
import { ApiRequestError } from '../common/types';

export type Profile = {
  __v: number;
  _id: string;
  bio: string;
  company: string;
  date: string;
  education: string[]; // todo?
  experience: string[]; // todo?
  githubusername: string;
  location: string;
  skills: string[];
  social: {
    youtube: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  status: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  website: string;
};

export type GithubRepo = {
  _id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
};

export type ProfilesState = {
  profiles: Profile[];
  profile?: Profile;
  repos: GithubRepo[];
  loading: boolean;
  error?: ApiRequestError;
};
