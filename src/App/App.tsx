import './App.css';

import { h } from '../dom';
import { classes } from '../classes';

import { Pages, PageRedirect, PageRoute } from '../Page';
import { Routes } from '../Routes';

import { About } from '../About';
import { Contact } from '../Contact';
import { Footer } from '../Footer';
import { Navigation } from '../Navigation';
import { Posts } from '../Posts';
import { Profile } from '../Profile';
import { Skills } from '../Skills';
import { Talks } from '../Talks';

import { AppModel } from './AppModel';

export const App = ({ model }: { model: AppModel }) => (
  <div class={classes(['fade-in', { 'fade-in-start': model.animation }])}>
    <Profile />
    <About model={model.about} />
    <Navigation routes={model.navigationRoutes} currentPath={model.router.pathname} />
    <Pages>
      <PageRedirect from={Routes.HOME} to={Routes.CONTACT} />
      <PageRoute route={Routes.CONTACT} model={model.contact} resolve={model.contact.getData} view={Contact} />
      <PageRoute route={Routes.SKILLS} model={model.skills} resolve={model.skills.getData} view={Skills} />
      <PageRoute route={Routes.POSTS} model={model.posts} resolve={model.posts.getData} view={Posts} />
      <PageRoute route={Routes.TALKS} model={model.talks} resolve={model.talks.getData} view={Talks} />
    </Pages>
    <Footer />
  </div>
);
