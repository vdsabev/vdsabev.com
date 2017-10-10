/** @jsx h */
import { h } from 'hyperapp';
import { Actions } from './index';

export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  CONTACT: { path: '/contact', title: 'Contact' },
  POSTS: { path: '/posts', title: 'Posts' }
};

const getRouteKeyFromPath = (path) => path ? path.replace('/', '').toUpperCase() : '';
const getRouteFromKey = (key) => Routes[key] || Routes.CONTACT;
const getRouteFromPath = (path) => getRouteFromKey(getRouteKeyFromPath(path));
const initialRouteKey = getRouteKeyFromPath(window.location.pathname);
const initialRoute = getRouteFromKey(initialRouteKey);

export const RouterModule = {
  state: {
    route: initialRoute
  },
  actions: {
    setRoute(state, actions, { route, options }) {
      if (!(options && options.skipHistoryStateUpdate)) {
        const routeKey = getRouteKeyFromPath(route.path);
        if (options && options.replace) {
          window.history.replaceState(routeKey, null, route.path);
        }
        else {
          window.history.pushState(routeKey, null, route.path);
        }
      }

      if (route.title) {
        document.title = `Vladimir Sabev - ${route.title}`;
      }

      return { route: route };
    }
  }
};

// TODO: Move inside `app({ init })` function when the next version of Hyperapp is released,
// and use `actions.setRoute` from witin the slice
window.history.replaceState(initialRouteKey, null, initialRoute.path);
window.addEventListener('popstate', (e) => {
  Actions.router.setRoute({ route: getRouteFromPath(e && e.state), options: { skipHistoryStateUpdate: true } });
});

// Both `href` and `onclick` can be overridden by the developer for more flexibility.
// Notice that we use `onclick || setRouteAndReturnFalse` to avoid creating an extra function
// in case the developer decided to provide the `onclick` event themselves.
export const Link = ({ route, options, onclick, ...props }, children) =>
  <a href={route.path} {...props} onclick={onclick || setRouteAndReturnFalse(route, options)}>{children}</a>
;

const setRouteAndReturnFalse = (route, options) => () => {
  Actions.router.setRoute({ route, options });
  return false; // Cancels the default route change so we can get a nice SPA :)
};
