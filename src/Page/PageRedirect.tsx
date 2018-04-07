import { h } from '../dom';
import { Redirect, Route } from '../router';
import { Route as RouteType } from '../Routes';

interface PageRedirectProps {
  from: RouteType;
  to: RouteType;
}

export const PageRedirect = ({ from, to }: PageRedirectProps) => (
  <Route path={from.path} render={() => <Redirect from={from.path} to={to.path} />} />
);
