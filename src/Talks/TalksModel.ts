import { ArticleModel } from '../Article';
import { Services } from '../Services';

export class TalksModel {
  talks: Record<string, ArticleModel> = {};
  async getData(): Promise<Partial<TalksModel>> {
    const talks = await Services.getTalks();
    return {
      talks: [...talks]
        .reverse()
        .reduce((talks, talk) => ({ ...talks, [talk.url]: new ArticleModel(talk) }), {}),
    };
  }
}
