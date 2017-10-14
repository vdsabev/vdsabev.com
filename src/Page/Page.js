import './Page.css';

/** @jsx h */
import { h } from 'hyperapp';

import { Actions } from '../App';
import { Loader } from '../Loader';
import { animationDuration } from '../style';

export const Page = (props) => {
  if (Actions.getRoute() !== props.route) return null;

  const MaybeLoader = cacheAndResolveWithLoader(props.module, props.resolve);
  if (MaybeLoader != null) return MaybeLoader;

  return (
    <props.view
      key={props.module}
      state={Actions.getModuleState(props.module)}
      actions={Actions.getModuleActions(props.module)}
      onremove={props.cache ? fadeOutPage : invalidateCacheAndFadeOutPage(props.module) }
    />
  );
};

const cachedModules = {};

const cacheAndResolveWithLoader = (moduleKey, resolve) => {
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
