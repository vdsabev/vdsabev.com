import { Articles } from '../Article';
import { PostsModel } from './PostsModel';

interface Properties extends Partial<HTMLDivElement> {
  model: PostsModel;
}

export const Posts = ({ model, ...props }: Properties) => Articles({ articles: model.posts, ...props });
