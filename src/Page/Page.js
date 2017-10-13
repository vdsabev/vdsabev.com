import './Page.css';

/** @jsx h */
import { h } from 'hyperapp';

import { Actions } from '../App';
import { Loader } from '../Loader';

import { animationDuration } from '../style';

export const Page = (props) => {
  const state = Actions.getState();
  if (!state.router) throw new Error(`Invalid value of 'state.router': ${state.roter}`);
  if (state.router.route !== props.route) return null;

  // NOTE: Page must be a top-level module for state & actions to be accessed
  // TODO: Use dot notation to reach deeper into the state if necessary
  const moduleState = state[props.module];
  if (!moduleState) throw new Error(`Invalid module state for: ${props.module}`);

  const moduleActions = Actions[props.module];
  // Module actions are optional, so we don't need to validate them

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

  return (
    <props.view
      key={props.module}
      state={moduleState}
      actions={moduleActions}
      onremove={props.cache ? fadeOutPage : invalidateCacheAndFadeOutPage(moduleState) }
    />
  );
};

const fadeOutPage = (el) => (remove) => {
  el.classList.add('page-fade-out');
  setTimeout(remove, 1000 * animationDuration);
};

const invalidateCacheAndFadeOutPage = (cache) => (el) => {
  cache.$resolved = false;
  fadeOutPage(el);
};
