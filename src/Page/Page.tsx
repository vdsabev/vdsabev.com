import './Page.css';

import { h } from '../dom';
import { classes } from '../classes';

import { Loader } from '../Loader';
import { Redirect, Route, Switch } from '../router';
import { Route as RouteType } from '../Routes';
import { transitionDuration } from '../style';

// Pages
interface PagesProps extends Props {}

export const Pages = (props: PagesProps, children: JSX.Element[]) => (
  <div {...props} class={classes(['pageContainer', props.class])}>
    <Switch>{children}</Switch>
  </div>
);

// Page Redirect
interface PageRedirectProps {
  from: RouteType;
  to: RouteType;
}

export const PageRedirect = ({ from, to }: PageRedirectProps) => (
  <Route path={from.path} render={() => <Redirect from={from.path} to={to.path} />} />
);

// Page Route
const cachedPageRoutes: Record<string, boolean> = {};

interface PageRouteProps {
  route: RouteType;
  resolve?: () => Promise<any>;
  model: any;
  view: (props: any) => JSX.Element;
}

export const PageRoute = (props: PageRouteProps) => (
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
);

const fadeOutPage = (el: Element) => (remove: Function) => {
  el.classList.add('pageFadeOut');
  setTimeout(remove, 1000 * transitionDuration);
};
