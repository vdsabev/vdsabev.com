import './Navigation.css';

/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

import { Actions } from '../App';
import { Routes, Link } from '../router';

export const Navigation = () => {
  const { router } = Actions.getState();

  return (
    <header class="navigation narrow">
      <PageLink currentRoute={router.route} pageRoute={Routes.CONTACT} />
      <PageLink currentRoute={router.route} pageRoute={Routes.SKILLS} />
      <PageLink currentRoute={router.route} pageRoute={Routes.POSTS} />
      <PageLink currentRoute={router.route} pageRoute={Routes.TALKS} />
    </header>
  );
};

const PageLink = ({ currentRoute, pageRoute }) =>
  <Link class={classy(['navigation-page-link', { active: currentRoute === pageRoute }])} route={pageRoute}>{pageRoute.title}</Link>
;
