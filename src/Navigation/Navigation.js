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
      <Link class={classy(['navigation-page-link', { active: router.route === Routes.CONTACT }])} route={Routes.CONTACT}>{Routes.CONTACT.title}</Link>
      <Link class={classy(['navigation-page-link', { active: router.route === Routes.POSTS }])} route={Routes.POSTS}>{Routes.POSTS.title}</Link>
    </header>
  );
};
