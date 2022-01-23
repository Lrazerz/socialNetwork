// for single and double underscores
/* eslint-disable @typescript-eslint/naming-convention */
import { ApiRequestError } from 'store/common/types';

export type ProfileEducation = {
  id: string;
  _id: string;
  school: string;
  degree: string;
  from: string;
  to: string;
  fieldofstudy: string;
  description: string;
};

export type ProfileExperience = {
  id: string;
  _id: string;
  title: string;
  company: string;
  from: string;
  to: string;
  description: string;
};

export type Profile = {
  __v: number;
  _id: string;
  bio: string;
  company: string;
  skills: string[];
  website: string;
  location: string;
  status: string;
  githubusername: string;
  education: ProfileEducation[];
  experience: ProfileExperience[];
  date: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  social: {
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
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

export type CreateUpdateProfileActionPayload = {
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  githubusername: string;
  bio: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  instagram: string;
};

export type AddEducationActionPayload = {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
};

export type AddExperienceActionPayload = {
  company: string;
  title: string;
  location: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
};
