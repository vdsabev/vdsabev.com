import './assets/avatar.png';
import './style.css';

/** @jsx h */
import { app, h } from 'hyperapp';

import { Profile } from './Profile';
import { About } from './About';
import { Contact } from './Contact';
import { PostList } from './PostList';
import { Footer } from './Footer';

import { sendGoogleAnalyticsEvent } from './google-analytics';

export const Actions = app({
  state: {
    contact: Contact.state
  },
  actions: {
    contact: Contact.actions,

    log(state, actions, name, data) {
      sendGoogleAnalyticsEvent(name, data);
    },
    error(state, actions, name, data) {
      sendGoogleAnalyticsEvent(name, data);
      if (process.env.NODE_ENV === 'development') {
        console.error(data);
      }
    }
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
