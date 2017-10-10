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
    setRoute(state, actions, newRoute, options) {
      const historyState = { route: newRoute, options };
      if (options && options.replace) {
        window.history.replaceState(historyState, null, newRoute.path);
      }
      else {
        window.history.pushState(historyState, null, newRoute.path);
      }

      if (newRoute.title) {
        document.title = `Vladimir Sabev - ${newRoute.title}`;
      }

      return { route: newRoute };
    }
  }
};

// TODO: Move inside `app({ init })` function when the next version of Hyperapp is released
window.addEventListener('popstate', (e) => {
  if (e && e.state) {
    Actions.router.setRoute(e.state.route, { ...e.state.options, replace: true });
  }
});

// Both `href` and `onclick` can be overridden by the developer for more flexibility.
// Notice that we use `onclick || setRouteAndReturnFalse` to avoid creating an extra function
// in case the developer decided to provide the `onclick` event themselves.
export const Link = ({ route, options, onclick, ...props }, children) =>
  <a href={route.path} {...props} onclick={onclick || setRouteAndReturnFalse(route, options)}>{children}</a>
;

const setRouteAndReturnFalse = (...args) => () => {
  Actions.router.setRoute(...args);
  return false; // Cancels the default route change so we can get a nice SPA :)
};
