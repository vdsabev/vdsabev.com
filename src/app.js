/** @jsx h */
import { app, h } from 'hyperapp';
import classy from 'classwrap';

import { About } from './About';
import { Contact, ContactModule } from './Contact';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { Page } from './Page';
import { Posts, PostsModule } from './Posts';
import { Profile } from './Profile';
import { Skills, SkillsModule } from './Skills';
import { Talks, TalksModule } from './Talks';

import { RouterModule, Routes } from './router';

export const Actions = app({
  init(state, actions) {
    // We need to use `setTimeout` for the animation to run properly
    setTimeout(actions.animate, 0);

    // PWA
    if (navigator.serviceWorker && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('service-worker.js', { scope: './' });
    }
  },
  modules: {
    contact: ContactModule,
    posts: PostsModule,
    skills: SkillsModule,
    talks: TalksModule,

    router: RouterModule
  },
  state: {
    animation: false
  },
  actions: {
    // NOTE: This is a thunk, it will return the state, but not re-render
    getState: (state) => () => state,
    animate: () => ({ animation: true })
  },
  view: (state, actions) =>
    <div class={classy(['fade-in', { 'fade-in-start': state.animation  }])}>
      <Profile />
      <About />
      <Navigation />
      <div class="page-container">
        <Page route={Routes.CONTACT} module="contact" view={Contact} resolve={actions.contact.getData} cache />
        <Page route={Routes.POSTS}   module="posts"   view={Posts}   resolve={actions.posts.getData}   cache />
        <Page route={Routes.SKILLS}  module="skills"  view={Skills}  resolve={actions.skills.getData}  cache />
        <Page route={Routes.TALKS}   module="talks"   view={Talks}   resolve={actions.talks.getData}   cache />
      </div>
      <Footer />
    </div>
});
