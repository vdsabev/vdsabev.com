import './favicon.png';

import './animation.css';
import './style.css';

/** @jsx h */
import { app, h } from 'hyperapp';
import { App, AppViewModel } from './App';

const Actions = app({
  state: AppViewModel.state,
  actions: AppViewModel.actions,
  view: (state, actions) => <App state={state} actions={actions} />
});

// We need to use `setTimeout` for the animation to run properly
setTimeout(Actions.animate, 0);

export const { router } = Actions;
export { Routes } from './router';
