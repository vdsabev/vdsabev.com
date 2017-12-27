import { Services } from '../services';

export const PostsModel = {
  posts: [],
  getData() {
    return Services.getPosts().then((posts) => ({ posts: posts.slice().reverse() }));
  }
};
