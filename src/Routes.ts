export interface Route {
  path: string;
  title: string;
}

export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  CONTACT: { path: '/contact', title: 'Contact' },
  SKILLS: { path: '/skills', title: 'Skills' },
  POSTS: { path: '/posts', title: 'Posts' },
  TALKS: { path: '/talks', title: 'Talks' },
};
