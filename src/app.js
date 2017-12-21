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
import { Skills, SkillsModel } from './Skills';
import { Talks, TalksModel } from './Talks';

import { Route, RouterModel } from './router';

export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  // TODO: Redirect to contact when opening `/`
  CONTACT: { path: '/contact', title: 'Contact' },
  SKILLS: { path: '/skills', title: 'Skills' },
  POSTS: { path: '/posts', title: 'Posts' },
  TALKS: { path: '/talks', title: 'Talks' }
};

const AppModel = {
  animation: false,

  animate: () => ({ animation: true }),
  contact: ContactModel,
  posts: PostsModel,
  skills: SkillsModel,
  talks: TalksModel,

  router: RouterModel,
};

const AppView = ({ model }) =>
  <div class={classy(['fade-in', { 'fade-in-start': model.animation  }])}>
    <Profile />
    <About />
    <Navigation />
    <div class="page-container">
      <Route path={Routes.CONTACT.path} render={Contact} model={model.contact} />
      <Route path={Routes.SKILLS.path}  render={Skills}  model={model.skills}  />
      <Route path={Routes.POSTS.path}   render={Posts}   model={model.posts}   />
      <Route path={Routes.TALKS.path}   render={Talks}   model={model.talks}   />
      {/* <Page route={Routes.CONTACT} model="contact" view={Contact} resolve={model.contact.getData} cache /> */}
      {/* <Page route={Routes.SKILLS}  model="skills"  view={Skills}  resolve={model.skills.getData}  cache /> */}
      {/* <Page route={Routes.POSTS}   model="posts"   view={Posts}   resolve={model.posts.getData}   cache /> */}
      {/* <Page route={Routes.TALKS}   model="talks"   view={Talks}   resolve={model.talks.getData}   cache /> */}
    </div>
    <Footer />
  </div>
;

const store = app({
  patch,
  model: AppModel,
  view: AppView
});

export const App = {
  getRoute() {
    return store.model.router;
  },
  getModel(modelName) {
    return store.model[modelName];
  }
};

// We need to use `setTimeout` for the animation to run properly
setTimeout(store.model.animate, 0);

// Router
store.model.router.subscribe(store.model.router);

// PWA
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', { scope: './' });
}
