import './Page.css';

/** @jsx h */
import { h } from 'hyperapp';

import { Actions } from '../App';
import { Loader } from '../Loader';

import { animationDuration } from '../style';

const cachedModules = {};

// NOTE: Currently, the page must be a top-level module for state & actions to be accessed
// If necessary, we can allow using dot notation to go deeper *inception.jpg*
export const Page = (props) => {
  const state = Actions.getState();
  if (!state.router) throw new Error(`Invalid value of 'state.router': ${state.roter}`);
  if (state.router.route !== props.route) return null;

  const MaybeLoader = resolveWithLoader(props.module, props.resolve);
  if (MaybeLoader != null) return MaybeLoader;

  return (
    <props.view
      key={props.module}
      state={state[props.module]}
      actions={Actions[props.module]}
      onremove={props.cache ? fadeOutPage : invalidateCacheAndFadeOutPage(props.module) }
    />
  );
};

const resolveWithLoader = (moduleKey, resolve) => {
  if (!resolve) return null;

  if (!cachedModules[moduleKey]) {
    cachedModules[moduleKey] = {};
  }

  const cachedModule = cachedModules[moduleKey];
  if (cachedModule.$resolved) return null;

  if (!cachedModule.$pending) {
    cachedModule.$pending = true;
    resolve()
      .then(() => {
        cachedModule.$resolved = true;
        cachedModule.$pending = false;
      })
      .catch(() => {
        cachedModule.$pending = false;
      })
    ;
  }

  return <Loader key={moduleKey} />;
};

const invalidateCacheAndFadeOutPage = (moduleKey) => (el) => {
  const cachedModule = cachedModules[moduleKey];
  if (cachedModule) {
    cachedModule.$resolved = false;
  }

  fadeOutPage(el);
};


const fadeOutPage = (el) => (remove) => {
  el.classList.add('page-fade-out');
  setTimeout(remove, 1000 * animationDuration);
};
