import './Page.css';

import { h } from '../dom';
import { classy } from '../classy';

import { Loader } from '../Loader';
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

export const PageRoute = (props) =>
  <Route
    path={props.route.path}
    render={() => {
      if (!cachedPageRoutes[props.route.path] && props.resolve) {
        cachedPageRoutes[props.route.path] = true;
        props.resolve().catch(() => {
          cachedPageRoutes[props.route.path] = false;
        });
        return <Loader key={props.route.path} />;
      }

      return <props.view key={props.route.path} model={props.model} onremove={fadeOutPage} />;
    }}
  />
;

const cachedPageRoutes: Record<string, boolean> = {};

const fadeOutPage = (el: Element) => (remove: Function) => {
  el.classList.add('page-fade-out');
  setTimeout(remove, 1000 * transitionDuration);
};
