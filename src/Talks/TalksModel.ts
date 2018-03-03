import { Article } from '../Article';
import { Services } from '../Services';

export class TalksModel {
  talks: Article[] = [];
  getData() {
    return Services.getTalks().then((talks: Article[]) => ({ talks: talks.slice().reverse() }));
  }
}
