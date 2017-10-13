/** @jsx h */
import { h } from 'hyperapp';

// TODO: Extract to `App.js` so we can add new routes more easily
export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  CONTACT: { path: '/contact', title: 'Contact' },
  SKILLS: { path: '/skills', title: 'Skills' },
  POSTS: { path: '/posts', title: 'Posts' },
  TALKS: { path: '/talks', title: 'Talks' }
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

// `href` can be overridden for more flexibility
// `onclick` handler will be called after main click handler if provided
export const Link = ({ route, options, onclick, ...props }, children) =>
  <a href={route.path} {...props} onclick={setRouteAndReturnFalse(route, options, onclick)}>{children}</a>
;

const setRouteAndReturnFalse = (route, options, onclick) => (e) => {
  setRoute({ route, options });

  if (onclick) {
    onclick(e);
  }

  // Cancel the default route change so we can get a nice SPA :)
  return false;
};
