import './Navigation.css';

/** @jsx h */
import { h } from '../dom';
import { classy } from '../classy';

import { App, Routes } from '../App';
import { Link } from '../router';

export const Navigation = () => {
  const currentRoute = App.getRoute();
  const scrollToContainer = (e) => {
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  };

  return (
    <header class="navigation narrow">
      <PageLink currentRoute={currentRoute} pageRoute={Routes.CONTACT} onclick={scrollToContainer} />
      <PageLink currentRoute={currentRoute} pageRoute={Routes.SKILLS}  onclick={scrollToContainer} />
      <PageLink currentRoute={currentRoute} pageRoute={Routes.POSTS}   onclick={scrollToContainer} />
      <PageLink currentRoute={currentRoute} pageRoute={Routes.TALKS}   onclick={scrollToContainer} />
    </header>
  );
};

const PageLink = ({ currentRoute, pageRoute, ...props }) =>
  <Link
    class={classy(['navigation-page-link', { active: currentRoute === pageRoute }])}
    to={pageRoute.path}
    {...props}
  >{pageRoute.title}</Link>
;
