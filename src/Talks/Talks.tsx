import { Articles } from '../Article';

export const Talks = ({ model, ...props }) => Articles({ articles: model.talks, ...props });
