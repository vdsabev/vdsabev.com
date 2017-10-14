/** @jsx h */
import { app, h } from 'hyperapp';
import classy from 'classwrap';

import { About } from './About';
import { Contact, ContactModule } from './Contact';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { Page, PageModule } from './Page';
import { Posts, PostsModule } from './Posts';
import { Profile } from './Profile';
import { Skills, SkillsModule } from './Skills';
import { Talks, TalksModule } from './Talks';

import { createRouter } from './router';

export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  CONTACT: { path: '/contact', title: 'Contact' },
  SKILLS: { path: '/skills', title: 'Skills' },
  POSTS: { path: '/posts', title: 'Posts' },
  TALKS: { path: '/talks', title: 'Talks' }
};

const router = createRouter({
  routes: Routes,
  defaultRoute: Routes.CONTACT
});

export const Link = router.Link;

export const Actions = app({
  init(state, actions) {
    // We need to use `setTimeout` for the animation to run properly
    setTimeout(actions.animate, 0);

    // PWA
    if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
      navigator.serviceWorker.register('service-worker.js', { scope: './' });
    }
  },
  state: {
    animation: false
  },
  actions: {
    animate: () => ({ animation: true }),

    // Thunks that return slices of the state, but don't cause a re-render
    getRoute: (state) => () => state.router.route,
    // NOTE: If needed, we can allow using dot notation to go deeper *inception.jpg*
    getModuleState: (state, actions, moduleKey) => () => state[moduleKey],
    getModuleActions: (state, actions, moduleKey) => () => actions[moduleKey]
  },
  modules: {
    contact: ContactModule,
    posts: PostsModule,
    skills: SkillsModule,
    talks: TalksModule,

    router: router.module
  },
  view: (state, actions) =>
    <div class={classy(['fade-in', { 'fade-in-start': state.animation  }])}>
      <Profile />
      <About />
      <Navigation />
      <div class="page-container">
        <Page route={Routes.CONTACT} module="contact" view={Contact} resolve={actions.contact.getData} cache />
        <Page route={Routes.SKILLS}  module="skills"  view={Skills}  resolve={actions.skills.getData}  cache />
        <Page route={Routes.POSTS}   module="posts"   view={Posts}   resolve={actions.posts.getData}   cache />
        <Page route={Routes.TALKS}   module="talks"   view={Talks}   resolve={actions.talks.getData}   cache />
      </div>
      <Footer />
    </div>
});
