import './Page.css';

import { h } from '../dom';
import { classy } from '../classy';

import { Loader } from '../Loader';
import { Redirect, Route, Switch } from '../router';
import { Route as RouteType } from '../Routes';
import { transitionDuration } from '../style';

// Pages
interface PagesProperties extends Partial<HTMLDivElement> {
  class?: string;
}

export const Pages = (props: PagesProperties, children: JSX.Element[]) =>
  <div {...props} class={classy(['page-container', props.class])}>
    <Switch>{children}</Switch>
  </div>
;

// Page Redirect
interface PageRedirectProperties {
  from: RouteType;
  to: RouteType;
}

export const PageRedirect = (props: PageRedirectProperties) =>
  <Route
    path={props.from.path}
    render={() =>
      <Redirect from={props.from.path} to={props.to.path} />
    }
  />
;

// Page Route
const cachedPageRoutes: Record<string, boolean> = {};

interface PageRouteProperties {
  route: RouteType;
  resolve?: () => Promise<any>;
  model: any;
  view: (props: any) => JSX.Element;
}

export const PageRoute = (props: PageRouteProperties) =>
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

const fadeOutPage = (el: Element) => (remove: Function) => {
  el.classList.add('page-fade-out');
  setTimeout(remove, 1000 * transitionDuration);
};
