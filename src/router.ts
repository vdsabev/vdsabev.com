/// <reference path="./router.d.ts" />

import { h } from './dom';
import { createLink } from './create-link';
import { location } from '@hyperapp/router/src/location';

export { Redirect } from '@hyperapp/router/src/Redirect';
export { Route } from '@hyperapp/router/src/Route';
export { Switch } from '@hyperapp/router/src/Switch';

export const RouterModel = {
  ...location.state,
  ...location.actions,
  subscribe: location.subscribe,
};

export const Link = createLink(h);
