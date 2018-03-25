import { Article } from '../Article';
import { Services } from '../Services';

export class PostsModel {
  posts: Article[] = [];
  async getData() {
    const posts = await Services.getPosts();
    return { posts: posts.slice().reverse() };
  }
}
