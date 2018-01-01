import { app } from 'derpy';
import { patch } from '../dom';

import { AppModel } from './AppModel';
import { App } from './App';

// TODO: Types
const store = app({
  patch: patch as any,
  model: AppModel,
  view: App as any
});

// We need to use `setTimeout` for the animation to run properly
setTimeout(store.model.animate, 0);

// Router
store.model.router.subscribe(store.model.router);

// PWA
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', { scope: './' });
}
