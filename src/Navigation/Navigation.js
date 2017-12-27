import './Navigation.css';

/** @jsx h */
import { h } from '../dom';
import { classy } from '../classy';
import { Link } from '../router';

export const Navigation = ({ routes, currentPath }) =>
  <header class="navigation narrow">
    {routes.map((route) => <PageLink pageRoute={route} currentPath={currentPath} onclick={scrollToContainer} />)}
  </header>
;

const scrollToContainer = (e) => {
  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
};

const PageLink = ({ pageRoute, currentPath, ...props }) =>
  <Link
    class={classy(['navigation-page-link', { active: currentPath === pageRoute.path }])}
    to={pageRoute.path}
    {...props}
  >{pageRoute.title}</Link>
;
