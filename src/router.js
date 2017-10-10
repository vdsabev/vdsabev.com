export const Routes = {
  HOME: { path: '/', title: 'Freelance Web Developer' },
  CONTACT: { path: '/contact', title: 'Contact' },
  POSTS: { path: '/posts', title: 'Posts' }
};

const initialRouteKey = window.location.pathname.replace('/', '');

export const RouterModule = {
  state: {
    route: Routes[initialRouteKey.toUpperCase()] || Routes.CONTACT
  },
  actions: {
    setRoute(state, actions, newRoute) {
      window.history.pushState(null, null, newRoute.path);
      document.title = `Vladimir Sabev - ${newRoute.title}`;
      return { route: newRoute };
    }
  }
};
