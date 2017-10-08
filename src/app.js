/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

import { Profile } from './Profile';
import { About } from './About';
import { Contact, ContactViewModel } from './Contact';
import { PostList } from './PostList';
import { Footer } from './Footer';

export const AppViewModel = {
  state: {
    animation: false,
    contact: ContactViewModel.state
  },
  actions: {
    animate: () => ({ animation: true }),
    contact: ContactViewModel.actions
  }
};

export const App = ({ state, actions }) =>
  <div class={classy(['fade-in', { 'fade-in-start': state.animation  }])}>
    <Profile />
    <About />
    <Contact state={state.contact} actions={actions.contact} />
    <PostList />
    <Footer />
  </div>
;
