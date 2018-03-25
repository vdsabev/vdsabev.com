import { Article } from '../Article';
import { Services } from '../Services';

export class TalksModel {
  talks: Article[] = [];
  async getData() {
    const talks = await Services.getTalks();
    return { talks: talks.slice().reverse() };
  }
}
