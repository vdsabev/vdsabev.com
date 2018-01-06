import { app } from 'derpy/app/picodom';
import { patch } from '../dom';

import { AppModel } from './AppModel';
import { App } from './App';

const store = app({
  patch,
  model: AppModel,
  view: App
});

// We need to use `setTimeout` for the animation to run properly
setTimeout(store.model.animate, 0);

// Router
store.model.router.subscribe(store.model.router);

// PWA
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', { scope: './' });
}
