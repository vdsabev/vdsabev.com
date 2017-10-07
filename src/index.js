import './assets/avatar.png';
import './style.css';

/** @jsx h */
import { app, h } from 'hyperapp';

import { Profile } from './Profile';
import { About } from './About';
import { Contact } from './Contact';
import { PostList } from './PostList';
import { Footer } from './Footer';

app({
  root: document.querySelector('#content'),
  state: {
    contact: Contact.state
  },
  actions: {
    contact: Contact.actions
  },
  view: (state, actions) =>
    <div>
      <Profile />
      <About />
      <Contact.view state={state.contact} actions={actions.contact} />
      <PostList />
      <Footer />
    </div>
});
