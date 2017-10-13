/** @jsx h */
import { app, h } from 'hyperapp';
import classy from 'classwrap';

import { About } from './About';
import { Contact, ContactModule } from './Contact';
import { Footer } from './Footer';
import { Loader } from './Loader';
import { Navigation } from './Navigation';
import { Posts, PostsModule } from './Posts';
import { Profile } from './Profile';
import { Skills, SkillsModule } from './Skills';
import { Talks, TalksModule } from './Talks';

import { animationDuration } from './style';
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
      <div class="page-container">
        <Page route={Routes.CONTACT} module="contact" view={Contact} resolve={actions.contact.getData} />
        <Page route={Routes.POSTS}   module="posts"   view={Posts}   resolve={actions.posts.getData} />
        <Page route={Routes.SKILLS}  module="skills"  view={Skills}  resolve={actions.skills.getData} />
        <Page route={Routes.TALKS}   module="talks"   view={Talks}   resolve={actions.talks.getData} />
      </div>
      <Footer />
    </div>
});

const Page = (props) => {
  const state = Actions.getState();
  if (state.router.route !== props.route) return null;

  const moduleState = state[props.module];
  if (!moduleState) throw new Error(`Invalid module state for: ${props.module}`);

  const moduleActions = Actions[props.module];
  if (!moduleActions) throw new Error(`Invalid module actions for: ${props.module}`);

  // NOTE: We don't need to set `$resolved` to false on element remove, because
  // the data only has to be loaded once throughout the lifecycle of the application
  // onremove={() => moduleState.$resolved = false}
  if (props.resolve && !moduleState.$resolved) {
    if (!moduleState.$pending) {
      moduleState.$pending = true;
      props.resolve()
        .then(() => {
          moduleState.$resolved = true;
          moduleState.$pending = false;
        })
        .catch(() => {
          moduleState.$pending = false;
        })
      ;
    }
    return <Loader key={props.module} />;
  }

  return <props.view key={props.module} state={moduleState} actions={moduleActions} onremove={fadeOutPage} />;
};

const fadeOutPage = (el) => (remove) => {
  el.classList.add('page-fade-out');
  setTimeout(remove, 1000 * animationDuration);
};
