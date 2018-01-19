import { Articles } from '../Article';
import { TalksModel } from './TalksModel';

interface TalksProps extends Props {
  model: TalksModel;
}

export const Talks = ({ model, ...props }: TalksProps) => Articles({ articles: model.talks, ...props });
