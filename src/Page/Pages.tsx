import './Pages.css';

import { h, classes } from '../dom';
import { Switch } from '../router';

interface PagesProps extends Props {}

export const Pages = (props: PagesProps, children: JSX.Element[]) => (
  <div {...props} class={classes(['pagesContainer', props.class])}>
    <Switch>{children}</Switch>
  </div>
);
