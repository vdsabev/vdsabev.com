/** @jsx h */
import { h } from 'hyperapp';

export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  CONTACT: { path: '/contact', title: 'Contact' },
  POSTS: { path: '/posts', title: 'Posts' }
};

const getRouteKeyFromPath = (path) => path ? path.replace('/', '').toUpperCase() : '';
const getRouteFromKey = (key) => Routes[key] || Routes.CONTACT;
const initialRouteKey = getRouteKeyFromPath(window.location.pathname);
const initialRoute = getRouteFromKey(initialRouteKey);

// NOTE: Allows us to use the `setRoute` action in the `Link` component
let setRoute;

export const RouterModule = {
  init(state, actions) {
    setRoute = actions.setRoute;

    window.history.replaceState(initialRouteKey, null, initialRoute.path);
    window.addEventListener('popstate', (e) => {
      // NOTE: We're restoring the state from the route key, which will stop working if we change a route's key
      actions.setRoute({ route: getRouteFromKey(e && e.state), options: { skipHistoryStateUpdate: true } });
    });
  },
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

// Both `href` and `onclick` can be overridden by the developer for more flexibility.
// Notice that we use `onclick || setRouteAndReturnFalse` to avoid creating an extra function
// in case the developer decided to provide the `onclick` handler themselves.
export const Link = ({ route, options, onclick, ...props }, children) =>
  <a href={route.path} {...props} onclick={onclick || setRouteAndReturnFalse(route, options)}>{children}</a>
;

const setRouteAndReturnFalse = (route, options) => () => {
  if (!setRoute) throw new Error(`'setRoute' hasn't been initialized yet!`);
  setRoute({ route, options });
  return false; // Cancels the default route change so we can get a nice SPA :)
};
