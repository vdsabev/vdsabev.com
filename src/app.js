/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

import { Profile } from './Profile';
import { About } from './About';
import { Contact, ContactViewModel } from './Contact';
import { Navigation } from './Navigation';
import { PostList } from './PostList';
import { Footer } from './Footer';

import { switchy } from './utils';

export const AppViewModel = {
  state: {
    animation: false,
    currentPage: window.location.pathname.replace('/', '') || 'contact',

    // Components
    contact: ContactViewModel.state
  },
  actions: {
    animate: () => ({ animation: true }),
    setCurrentPage(state, actions, newPage) {
      window.history.pushState(null, null, `/${newPage}`);
      return { currentPage: newPage };
    },
    contact: ContactViewModel.actions
  }
};

export const App = ({ state, actions }) =>
  <div class={classy(['fade-in', { 'fade-in-start': state.animation  }])}>
    <Profile />
    <About />
    <Navigation currentPage={state.currentPage} setCurrentPage={actions.setCurrentPage} />
    {switchy(state.currentPage, {
      contact: () => <Contact state={state.contact} actions={actions.contact} />,
      posts: () => <PostList />
    })}
    <Footer />
  </div>
;
