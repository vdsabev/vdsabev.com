/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

import { Profile } from './Profile';
import { About } from './About';
import { Contact, ContactModule } from './Contact';
import { Navigation } from './Navigation';
import { PostList } from './PostList';
import { Footer } from './Footer';

import { RouterModule, Routes } from './router';

export const AppModule = {
  state: {
    animation: false,

    // TODO: Move inside `{ modules }` when the next version of Hyperapp is released
    contact: ContactModule.state,
    router: RouterModule.state
  },
  actions: {
    // NOTE: This is a thunk, it will get the state, but not re-render
    getState: (state) => () => state,

    animate: () => ({ animation: true }),

    // TODO: Move inside `{ modules }` when the next version of Hyperapp is released
    contact: ContactModule.actions,
    router: RouterModule.actions
  }
};

export const App = ({ state, actions }) =>
  <div class={classy(['fade-in', { 'fade-in-start': state.animation  }])}>
    <Profile />
    <About />
    <Navigation />
    {state.router.route === Routes.CONTACT ? <Contact state={state.contact} actions={actions.contact} /> : null}
    {state.router.route === Routes.POSTS   ? <PostList /> : null}
    <Footer />
  </div>
;
