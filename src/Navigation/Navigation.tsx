import './Navigation.css';

import { h } from '../dom';
import { classy } from '../classy';

import { Link } from '../router';
import { Route } from '../Routes';

export const Navigation = ({ routes, currentPath }: { routes: Route[], currentPath: string }) =>
  <header class="navigation narrow">
    {routes.map((route) => <PageLink pageRoute={route} currentPath={currentPath} onclick={scrollToContainer} />)}
  </header>
;

const scrollToContainer = (e: Event) => {
  (e.currentTarget as Element).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
};

interface PageLinkProperties extends Partial<HTMLAnchorElement> {
  pageRoute: Route;
  currentPath: string;
}

const PageLink = ({ pageRoute, currentPath, ...props }: PageLinkProperties) =>
  <Link
    class={classy(['navigation-page-link', { active: currentPath === pageRoute.path }])}
    to={pageRoute.path}
    {...props}
  >{pageRoute.title}</Link>
;
