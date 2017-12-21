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

import { RouterModel, Redirect, Route, Switch } from './router';

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
      <Switch>
        <RouteRedirect from={Routes.HOME} to={Routes.CONTACT} />
        <RoutePage route={Routes.CONTACT} model={model.contact} view={Contact} />
        <RoutePage route={Routes.SKILLS}  model={model.skills}  view={Skills}  />
        <RoutePage route={Routes.POSTS}   model={model.posts}   view={Posts}   />
        <RoutePage route={Routes.TALKS}   model={model.talks}   view={Talks}   />
      </Switch>
    </div>
    <Footer />
  </div>
;

const RouteRedirect = (props) =>
  <Route
    path={props.from.path}
    render={() =>
      <Redirect from={props.from.path} to={props.to.path} />
    }
  />
;

const RoutePage = (props) =>
  <Route
    path={props.route.path}
    render={() =>
      <props.view key={props.route.path} model={props.model} oncreate={props.model.getData} />
    }
  />
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
