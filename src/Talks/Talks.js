/** @jsx h */
import { h } from 'hyperapp';
import { Articles } from '../Article';
import { Services } from '../services';

export const TalksModule = {
  state: {
    talks: []
  },
  actions: {
    getData: () => (update) => Services.getTalks().then((talks) => ({ talks: talks.slice().reverse() })).then(update)
  }
};

export const Talks = ({ state, actions, ...props }) => Articles({ articles: state.talks, oncreate: actions.getData, ...props });
