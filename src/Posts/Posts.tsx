import { Articles } from '../Article';
import { PostsModel } from './PostsModel';

interface PostsProps extends Props {
  model: PostsModel;
}

export const Posts = ({ model, ...props }: PostsProps) => Articles({ articles: model.posts, ...props });
