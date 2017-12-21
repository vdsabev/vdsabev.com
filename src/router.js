/** @jsx h */
import { h } from './dom';
import { location } from '@hyperapp/router/src/location';

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

// TODO: Finish
export const Route = ({ path, render, model }) => {
  if (path === window.location.pathname) {
    model.getData();
    return render({ key: path, model });
  }
}
