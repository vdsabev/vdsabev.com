import './App.css';

/** @jsx h */
import { h } from '../dom';
import { classy } from '../classy';

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

export const App = ({ model }) =>
  <div class={classy(['fade-in', { 'fade-in-start': model.animation }])}>
    <Profile />
    <About model={model.about} />
    <Navigation routes={model.routes} currentPath={model.router.pathname} />
    <Pages>
      <PageRedirect from={Routes.HOME} to={Routes.CONTACT} />
      <PageRoute route={Routes.CONTACT} model={model.contact} resolve={model.contact.getData} view={Contact} />
      <PageRoute route={Routes.SKILLS}  model={model.skills}  resolve={model.skills.getData}  view={Skills}  />
      <PageRoute route={Routes.POSTS}   model={model.posts}   resolve={model.posts.getData}   view={Posts}   />
      <PageRoute route={Routes.TALKS}   model={model.talks}   resolve={model.talks.getData}   view={Talks}   />
    </Pages>
    <Footer />
  </div>
;
