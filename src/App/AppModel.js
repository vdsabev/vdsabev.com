import { RouterModel } from '../router';

import { ContactModel } from '../Contact';
import { PostsModel } from '../Posts';
import { SkillsModel } from '../Skills';
import { TalksModel } from '../Talks';

export const AppModel = {
  animation: false,
  animate: () => ({ animation: true }),

  router: RouterModel,

  contact: ContactModel,
  posts: PostsModel,
  skills: SkillsModel,
  talks: TalksModel,
};
