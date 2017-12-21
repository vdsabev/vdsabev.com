/** @jsx h */
import { h } from '../dom';
import { Articles } from '../Article';
import { Services } from '../services';

export const TalksModel = {
  talks: [],
  getData() {
    return Services.getTalks().then((talks) => ({ talks: talks.slice().reverse() }));
  }
};

export const Talks = ({ model, ...props }) => Articles({ articles: model.talks, ...props });
