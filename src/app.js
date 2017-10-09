/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

import { Profile } from './Profile';
import { About } from './About';
import { Contact, ContactViewModel } from './Contact';
import { Navigation } from './Navigation';
import { PostList } from './PostList';
import { Footer } from './Footer';

import { router, Routes } from './router';

export const AppViewModel = {
  state: {
    animation: false,
    contact: ContactViewModel.state,
    router: router.state
  },
  actions: {
    animate: () => ({ animation: true }),
    contact: ContactViewModel.actions,
    router: router.actions
  }
};

export const App = ({ state, actions }) =>
  <div class={classy(['fade-in', { 'fade-in-start': state.animation  }])}>
    <Profile />
    <About />
    <Navigation currentRoute={state.router.route} />
    {state.router.route === Routes.CONTACT ? <Contact state={state.contact} actions={actions.contact} /> : null}
    {state.router.route === Routes.POSTS   ? <PostList /> : null}
    <Footer />
  </div>
;
