/** @jsx h */
import { h } from '../dom';
import { Articles } from '../Article';
import { Services } from '../services';

export const PostsModel = {
  posts: [],
  getData() {
    return Services.getPosts().then((posts) => ({ posts: posts.slice().reverse() }));
  }
};

export const Posts = ({ model, ...props }) => Articles({ articles: model.posts, ...props });
