import { Articles } from '../Article';
import { TalksModel } from './TalksModel';

interface Properties extends Partial<HTMLDivElement> {
  model: TalksModel;
}

export const Talks = ({ model, ...props }: Properties) => Articles({ articles: model.talks, ...props });
