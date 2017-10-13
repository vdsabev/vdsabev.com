/** @jsx h */
import { app, h } from 'hyperapp';
import classy from 'classwrap';

import { About } from './About';
import { Contact, ContactModule } from './Contact';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
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
  view: ({ router, ...state }, actions) =>
    <div class={classy(['fade-in', { 'fade-in-start': state.animation  }])}>
      <Profile />
      <About />
      <Navigation />
      {router.route === Routes.CONTACT ? <Contact key="contact" state={state.contact} actions={actions.contact} /> : null}
      {router.route === Routes.POSTS   ? <Posts   key="posts"   state={state.posts}   actions={actions.posts}   /> : null}
      {router.route === Routes.SKILLS  ? <Skills  key="skills"  state={state.skills}  actions={actions.skills}  /> : null}
      {router.route === Routes.TALKS   ? <Talks   key="talks"   state={state.talks}   actions={actions.talks}   /> : null}
      <Footer />
    </div>
});
