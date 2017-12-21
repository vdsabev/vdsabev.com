import './Navigation.css';

/** @jsx h */
import { h } from '../dom';
import { classy } from '../classy';

import { App, Routes } from '../App';
import { Link } from '../router';

export const Navigation = () => {
  const currentPath = App.getRouterPath();
  const scrollToContainer = (e) => {
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  };

  return (
    <header class="navigation narrow">
      <PageLink pageRoute={Routes.CONTACT} currentPath={currentPath} onclick={scrollToContainer} />
      <PageLink pageRoute={Routes.SKILLS}  currentPath={currentPath} onclick={scrollToContainer} />
      <PageLink pageRoute={Routes.POSTS}   currentPath={currentPath} onclick={scrollToContainer} />
      <PageLink pageRoute={Routes.TALKS}   currentPath={currentPath} onclick={scrollToContainer} />
    </header>
  );
};

const PageLink = ({ pageRoute, currentPath, ...props }) =>
  <Link
    class={classy(['navigation-page-link', { active: currentPath === pageRoute.path }])}
    to={pageRoute.path}
    {...props}
  >{pageRoute.title}</Link>
;
