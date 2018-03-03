import { Article } from '../Article';
import { Services } from '../Services';

export class PostsModel {
  posts: Article[] = [];
  getData() {
    return Services.getPosts().then((posts: Article[]) => ({ posts: posts.slice().reverse() }));
  }
}
