import './Navigation.css';

/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

import { Actions } from '../App';
import { Routes, Link } from '../router';

export const Navigation = () => {
  const { router } = Actions.getState();
  const scrollToContainer = (e) => {
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  };

  return (
    <header class="navigation narrow">
      <PageLink currentRoute={router.route} pageRoute={Routes.CONTACT} onclick={scrollToContainer} />
      <PageLink currentRoute={router.route} pageRoute={Routes.SKILLS} onclick={scrollToContainer} />
      <PageLink currentRoute={router.route} pageRoute={Routes.POSTS} onclick={scrollToContainer} />
      <PageLink currentRoute={router.route} pageRoute={Routes.TALKS} onclick={scrollToContainer} />
    </header>
  );
};

const PageLink = ({ currentRoute, pageRoute, ...props }) =>
  <Link class={classy(['navigation-page-link', { active: currentRoute === pageRoute }])} route={pageRoute} {...props}>{pageRoute.title}</Link>
;
