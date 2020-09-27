import './App.css';

import { h } from '../dom';

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
  <div class="app">
    <Profile />
    <About model={model.about} />
    <Navigation routes={model.navigationRoutes} currentPath={model.router.pathname} />
    <Pages>
      <PageRedirect from={Routes.HOME} to={Routes.CONTACT} />
      <PageRoute page={model.page} route={Routes.CONTACT} model={model.contact} resolve={model.contact.getData} view={Contact} />
      <PageRoute page={model.page} route={Routes.SKILLS} model={model.skills} resolve={model.skills.getData} view={Skills} />
      <PageRoute page={model.page} route={Routes.POSTS} model={model.posts} resolve={model.posts.getData} view={Posts} />
      <PageRoute page={model.page} route={Routes.TALKS} model={model.talks} resolve={model.talks.getData} view={Talks} />
    </Pages>
    <Footer />
  </div>
);
