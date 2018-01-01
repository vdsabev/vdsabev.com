interface Hyperscript {
  (tag: string, props: any, children: any[]): JSX.Element;
}

interface Properties extends Partial<HTMLAnchorElement> {
  class?: string;
  to: string;
  location?: Location;
}

// TODO: Remove when https://github.com/hyperapp/router/pulls/32 is merges
export const createLink = (h: Hyperscript) => (props: Properties, children: any[]) => {
  const to = props.to;
  const location = props.location || window.location;

  props.href = to;

  // TODO: Remove when https://github.com/hyperapp/router/issues/19 is fixed
  const originalOnClick = props.onclick;
  props.onclick = function (e) {
    const shouldFollowUrl = (
      e.button !== 0 ||
      e.altKey ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      props.target === '_blank' ||
      (e.currentTarget as any).origin !== location.origin
    );

    if (!shouldFollowUrl) {
      e.preventDefault()

      if (to !== location.pathname) {
        history.pushState(location.pathname, '', to)
      }
    }

    if (originalOnClick) {
      originalOnClick.call(this, e);
    }
  }

  return h('a', props, children);
};
