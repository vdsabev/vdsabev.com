import './Page.css';

/** @jsx h */
import { h } from '../dom';
import { classy } from '../classy';

import { App } from '../App';
// import { Loader } from '../Loader';
import { Redirect, Route, Switch } from '../router';
import { transitionDuration } from '../style';

export const Pages = (props, children) =>
  <div {...props} class={classy(['page-container', props.class])}>
    <Switch>{children}</Switch>
  </div>
;

export const PageRedirect = (props) =>
  <Route
    path={props.from.path}
    render={() =>
      <Redirect from={props.from.path} to={props.to.path} />
    }
  />
;

// TODO: Show loader while loading data
// TODO: Cache data
export const PageRoute = (props) =>
  <Route
    path={props.route.path}
    render={() =>
      <props.view
        key={props.route.path}
        model={props.model}
        oncreate={props.model.getData}
        onremove={fadeOutPage}
      />
    }
  />
;

const fadeOutPage = (el) => (remove) => {
  el.classList.add('page-fade-out');
  setTimeout(remove, 1000 * transitionDuration);
};
