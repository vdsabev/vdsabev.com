// Assets
import './logo.png';
import './favicon.png';

// Style
import './style.css';

// Application
import { createStore } from 'overstate';
import { app } from 'overstate/app/picodom';
import { debug, DevToolsStore } from 'overstate/debug/redux-devtools';

import { render } from './dom';

import { App, AppModel } from './App';

const model = new AppModel();
const store = process.env.NODE_ENV === 'production' ? createStore(model) : debug(createStore(model));

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

// NOTE: Rendering the application must happen AFTER the model subscribes to router changes!
app({ store, view: App, render });

// NOTE: We need to use `setTimeout` for the animation to run properly
setTimeout(store.model.animate, 0);

// PWA
if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', { scope: './' });
}
