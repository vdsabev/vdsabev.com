/** @jsx h */
import { h } from 'hyperapp';
import { Actions } from './index';

export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  CONTACT: { path: '/contact', title: 'Contact' },
  POSTS: { path: '/posts', title: 'Posts' }
};

const initialRouteKey = window.location.pathname.replace('/', '');
const initialRoute = Routes[initialRouteKey.toUpperCase()] || Routes.CONTACT;

export const RouterModule = {
  state: {
    route: initialRoute
  },
  actions: {
    // TODO: Support more arguments for `history.pushState`, e.g. { replace: true }
    setRoute(state, actions, newRoute) {
      window.history.pushState(null, null, newRoute.path);
      if (newRoute.title) {
        document.title = `Vladimir Sabev - ${newRoute.title}`;
      }

      return { route: newRoute };
    }
  }
};

// TODO: Support overriding onclick
// TODO: Use rest arguments `{ route, onclick, ...props }`
export const Link = (props, children) =>
  <a {...props} href={props.route.url} onclick={setRouteAndReturnFalse(props.route)}>{children}</a>
;

const setRouteAndReturnFalse = (route) => () => {
  Actions.router.setRoute(route);
  return false;
};
