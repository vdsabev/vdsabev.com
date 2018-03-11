import { createStore } from 'overstate';
import { app } from 'overstate/app/picodom';
import { debug, DevToolsStore } from 'overstate/debug/redux-devtools';

import { render } from '../dom';

import { AppModel } from './AppModel';
import { App } from './App';

const model = new AppModel();
const store = process.env.NODE_ENV === 'production' ? createStore(model) : debug(createStore(model));
app({ store, view: App, render });

// We need to use `setTimeout` for the animation to run properly
setTimeout(store.model.animate, 0);

// Router
let unsubscribe = store.model.router.subscribe(store.model.router);
if (process.env.NODE_ENV !== 'production') {
  const { devtools } = store as DevToolsStore<typeof store.model>;
  if (devtools) {
    devtools.subscribe((message) => {
      if (message.type === 'DISPATCH' && message.state) {
        unsubscribe();
        history.replaceState(store.model.router.pathname, '', store.model.router.pathname);
        unsubscribe = store.model.router.subscribe(store.model.router);
      }
    });
  }
}

// PWA
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', { scope: './' });
}
