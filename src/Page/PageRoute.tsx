import './PageRoute.css';

import { h } from '../dom';
import { Loader } from '../Loader';
import { RequestStatus } from '../RequestStatus';
import { Route } from '../router';
import { Route as RouteType } from '../Routes';
import { transitionDuration } from '../style';

import { PageModel } from './PageModel';

interface PageRouteProps {
  page: PageModel;
  route: RouteType;
  resolve?: () => Promise<any>;
  model: any;
  view: (props: any) => JSX.Element;
}

export const PageRoute = ({ page, route, resolve, ...props }: PageRouteProps) => (
  <Route
    path={route.path}
    render={() => {
      const status = page.statuses[route.path];

      if (status == null && resolve) {
        page.resolve(route.path, resolve);
      }

      if (status == null || status == RequestStatus.pending) {
        return <Loader key={route.path} />;
      }

      if (status == RequestStatus.error) {
        return <div class="narrow">{page.errors.map((error) => [error.message, <br />])}</div>;
      }

      return <props.view key={route.path} model={props.model} onremove={fadeOutPage} />;
    }}
  />
);

const fadeOutPage = (el: Element) => (remove: Function) => {
  el.classList.add('pageFadeOut');
  setTimeout(remove, 1000 * transitionDuration);
};
