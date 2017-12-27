import { RouterModel } from '../router';
import { Routes } from '../Routes';

import { AboutModel } from '../About';
import { ContactModel } from '../Contact';
import { PostsModel } from '../Posts';
import { SkillsModel } from '../Skills';
import { TalksModel } from '../Talks';

export const AppModel = {
  animation: false,
  animate: () => ({ animation: true }),

  router: RouterModel,
  routes: [
    Routes.CONTACT,
    Routes.SKILLS,
    Routes.POSTS,
    Routes.TALKS,
  ],

  about: AboutModel,
  contact: ContactModel,
  posts: PostsModel,
  skills: SkillsModel,
  talks: TalksModel,
};
