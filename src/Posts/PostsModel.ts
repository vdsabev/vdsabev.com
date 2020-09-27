import { ArticleModel } from '../Article';
import { Services } from '../Services';

export class PostsModel {
  posts: Record<string, ArticleModel> = {};
  async getData(): Promise<Partial<PostsModel>> {
    const posts = await Services.getPosts();
    return {
      posts: [...posts]
        .reverse()
        .reduce((posts, post) => ({ ...posts, [post.url]: new ArticleModel(post) }), {}),
    };
  }
}
