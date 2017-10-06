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
  view: () =>
    <div>
      <Profile />
      <About />
      <Contact />
      <PostList />
      <Footer />
    </div>
});
