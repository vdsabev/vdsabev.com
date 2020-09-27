import { ImageModel } from '../Image/ImageModel';

export interface Article {
  url: string;
  title: string;
  description: string;
  date: string;
}

export class ArticleModel implements Article {
  url = ''
  title = ''
  description = ''
  date = ''
  image = new ImageModel()

  constructor(article: Article) {
    Object.assign(this, article)
  }
}
