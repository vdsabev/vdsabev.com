/** @jsx h */
import { h } from 'hyperapp';
import { Articles } from '../Article';
import { Services } from '../services';

export const PostsModule = {
  state: {
    posts: []
  },
  actions: {
    getData: () => (update) => Services.getPosts().then((posts) => ({ posts: posts.slice().reverse() })).then(update)
  }
};

export const Posts = ({ state, actions, ...props }) => Articles({ articles: state.posts, oncreate: actions.getData, ...props });
