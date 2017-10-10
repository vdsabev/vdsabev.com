/** @jsx h */
import { h } from 'hyperapp';

export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  CONTACT: { path: '/contact', title: 'Contact' },
  POSTS: { path: '/posts', title: 'Posts' }
};

const initialRouteKey = window.location.pathname.replace('/', '');
const initialRoute = Routes[initialRouteKey.toUpperCase()] || Routes.CONTACT;

export const router = {
  route: initialRoute,
  setRoute() {
    throw new Error(`'setRoute' action hasn't been initialized yet!`);
  }
};

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

      // TODO: Find a better way to do this
      // Copy the current route into the `router` object so we can use it
      // without explicitly passing it down the component tree
      router.route = newRoute;

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
  router.setRoute(route);
  return false;
};
