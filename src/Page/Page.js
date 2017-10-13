import './Page.css';

/** @jsx h */
import { h } from 'hyperapp';

import { Actions } from '../App';
import { Loader } from '../Loader';

export const Page = (props) => {
  const state = Actions.getState();
  if (state.router.route !== props.route) return null;

  const moduleState = state[props.module];
  if (!moduleState) throw new Error(`Invalid module state for: ${props.module}`);

  const moduleActions = Actions[props.module];
  if (!moduleActions) throw new Error(`Invalid module actions for: ${props.module}`);

  // NOTE: We don't need to set `$resolved` to false on element remove, because
  // the data only has to be loaded once throughout the lifecycle of the application
  // onremove={() => moduleState.$resolved = false}
  if (props.resolve && !moduleState.$resolved) {
    if (!moduleState.$pending) {
      moduleState.$pending = true;
      props.resolve()
        .then(() => {
          moduleState.$resolved = true;
          moduleState.$pending = false;
        })
        .catch(() => {
          moduleState.$pending = false;
        })
      ;
    }
    return <Loader key={props.module} />;
  }

  return <props.view key={props.module} state={moduleState} actions={moduleActions} onremove={fadeOutPage} />;
};

const fadeOutPage = (el) => (remove) => {
  el.classList.add('page-fade-out');
  setTimeout(remove, 1000 * animationDuration);
};
