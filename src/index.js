import './assets/avatar.png';
import './style.css';

/** @jsx h */
import { app, h } from 'hyperapp';
import { App, AppViewModel } from './App';

app({
  state: AppViewModel.state,
  actions: AppViewModel.actions,
  view: (state, actions) => <App state={state} actions={actions} />
});
