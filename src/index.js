import './favicon.png';

import './animation.css';
import './style.css';

/** @jsx h */
import { app, h } from 'hyperapp';
import { App, AppModule } from './App';
import { router } from './router';

const Actions = app({
  state: AppModule.state,
  actions: AppModule.actions,
  view: (state, actions) => <App state={state} actions={actions} />
});

initializeApp();

// TODO: Move inside `app({ init })` function when the next version of Hyperapp is released
function initializeApp() {
  // We need to use `setTimeout` for the animation to run properly
  setTimeout(Actions.animate, 0);

  // PWA
  if (navigator.serviceWorker && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('service-worker.js', { scope: './' });
  }

  // TODO: Find a better way to do this
  // Router
  router.setRoute = Actions.router.setRoute;
}
