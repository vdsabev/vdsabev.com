import { logger } from './logger';

const firebase = {
  get: (path) => () => fetch(`${process.env.FIREBASE_DATABASE_URL}/${path}.json`).then((response) => response.json()).catch(logger.error)
};

export const Services = {
  getAvailability: firebase.get('availability'),
  getPosts: firebase.get('posts'),
  getSkills: firebase.get('skills'),
  getTalks: firebase.get('talks')
};
