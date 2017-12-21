import './Page.css';

/** @jsx h */
import { h } from '../dom';

import { App } from '../App';
import { Loader } from '../Loader';
import { animationDuration } from '../style';

export const Page = (props) => {
  if (App.getRoute().pathname !== props.route.path) return null;

  const MaybeLoader = cacheAndResolveWithLoader(props.model, props.resolve);
  if (MaybeLoader != null) return MaybeLoader;

  return (
    <props.view
      key={props.model}
      model={App.getModel(props.model)}
      onremove={props.cache ? fadeOutPage : invalidateCacheAndFadeOutPage(props.model) }
    />
  );
};

const cachedModels = {};

const cacheAndResolveWithLoader = (modelKey, resolve) => {
  if (!resolve) return null;

  if (!cachedModels[modelKey]) {
    cachedModels[modelKey] = {};
  }

  const cachedModel = cachedModels[modelKey];
  if (cachedModel.$resolved) return null;

  if (!cachedModel.$pending) {
    cachedModel.$pending = true;
    resolve()
      .then(() => {
        cachedModel.$resolved = true;
        cachedModel.$pending = false;
      })
      .catch(() => {
        cachedModel.$pending = false;
      })
    ;
  }

  return <Loader key={modelKey} />;
};

const invalidateCacheAndFadeOutPage = (modelKey) => (el) => {
  const cachedModel = cachedModels[modelKey];
  if (cachedModel) {
    cachedModel.$resolved = false;
  }

  fadeOutPage(el);
};

const fadeOutPage = (el) => (remove) => {
  el.classList.add('page-fade-out');
  setTimeout(remove, 1000 * animationDuration);
};
