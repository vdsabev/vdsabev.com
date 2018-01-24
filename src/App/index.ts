import { createStore } from 'derpy';
import { app } from 'derpy/app/picodom';
import { debug, DevToolsStore } from 'derpy/debug/redux-devtools';

import { patch } from '../dom';

import { AppModel } from './AppModel';
import { App } from './App';

const model = new AppModel();
const store = process.env.NODE_ENV === 'production' ? createStore(model) : debug(createStore(model));
app({ store, view: App, patch });

// We need to use `setTimeout` for the animation to run properly
setTimeout(store.model.animate, 0);

// Router
store.model.router.subscribe(store.model.router);
if (process.env.NODE_ENV !== 'production') {
  (store as DevToolsStore<typeof store.model>).devtools.subscribe((message) => {
    if (message.type === 'DISPATCH' && message.state) {
      history.replaceState(store.model.router.pathname, '', store.model.router.pathname);
    }
  });
}

// PWA
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', { scope: './' });
}
