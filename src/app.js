/** @jsx h */
import { h, patch } from './dom';
import { classy } from './classy';
import { app } from 'derpy';

import { About } from './About';
import { Contact, ContactModel } from './Contact';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
// import { Page } from './Page';
import { Posts, PostsModel } from './Posts';
import { Profile } from './Profile';
import { Pages, PageRedirect, PageRoute } from './Page';
import { RouterModel } from './router';
import { Skills, SkillsModel } from './Skills';
import { Talks, TalksModel } from './Talks';

export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  CONTACT: { path: '/contact', title: 'Contact' },
  SKILLS: { path: '/skills', title: 'Skills' },
  POSTS: { path: '/posts', title: 'Posts' },
  TALKS: { path: '/talks', title: 'Talks' }
};

const AppModel = {
  animation: false,
  animate: () => ({ animation: true }),

  router: RouterModel,

  contact: ContactModel,
  posts: PostsModel,
  skills: SkillsModel,
  talks: TalksModel,
};

const AppView = ({ model }) =>
  <div class={classy(['fade-in', { 'fade-in-start': model.animation  }])}>
    <Profile />
    <About />
    <Navigation />
    <Pages>
      <PageRedirect from={Routes.HOME} to={Routes.CONTACT} />
      <PageRoute route={Routes.CONTACT} model={model.contact} view={Contact} />
      <PageRoute route={Routes.SKILLS}  model={model.skills}  view={Skills}  />
      <PageRoute route={Routes.POSTS}   model={model.posts}   view={Posts}   />
      <PageRoute route={Routes.TALKS}   model={model.talks}   view={Talks}   />
    </Pages>
    <Footer />
  </div>
;

const store = app({
  patch,
  model: AppModel,
  view: AppView
});

// We need to use `setTimeout` for the animation to run properly
setTimeout(store.model.animate, 0);

// Router
store.model.router.subscribe(store.model.router);

// PWA
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', { scope: './' });
}

export const App = {
  getRouterPath() {
    return store.model.router.pathname;
  }
};
