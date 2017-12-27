import { Services } from '../services';

export const TalksModel = {
  talks: [],
  getData() {
    return Services.getTalks().then((talks) => ({ talks: talks.slice().reverse() }));
  }
};
