import './Navigation.css';

/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

import { router, Routes } from '../index';

export const Navigation = ({ currentRoute }) =>
  <header class="navigation narrow">
    {[Routes.CONTACT, Routes.POSTS].map(PageLink({ currentRoute }))}
  </header>
;

const PageLink = ({ currentRoute }) => (route) =>
  <a
    href={route.url}
    class={classy(['navigation-page-link', { active: currentRoute === route }])}
    onclick={setRoute(route)}
  >
    {route.title}
  </a>
;

const setRoute = (route) => () => {
  router.setRoute(route);
  return false;
};
