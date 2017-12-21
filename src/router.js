/** @jsx h */
import { h } from './dom';
import { location } from '@hyperapp/router/src/location';

export { Redirect } from '@hyperapp/router/src/Redirect';
export { Route } from '@hyperapp/router/src/Route';
export { Switch } from '@hyperapp/router/src/Switch';

export const RouterModel = {
  ...location.state,
  ...location.actions,
  subscribe: location.subscribe,
};

export const Link = (props, children) => {
  var to = props.to;
  var location = props.location || window.location;

  props.href = to;
  props.onclick = (e) => {
    const shouldFollowUrl = (
      e.button !== 0 ||
      e.altKey ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      props.target === '_blank' ||
      e.currentTarget.origin !== location.origin
    );

    if (!shouldFollowUrl) {
      e.preventDefault()

      if (to !== location.pathname) {
        history.pushState(location.pathname, '', to)
      }
    }
  }

  return <a {...props}>{children}</a>;
};
