/** @jsx h */
import { h } from '../dom';
import { Articles } from '../Article';

export const Posts = ({ model, ...props }) => Articles({ articles: model.posts, ...props });
