import './Loader.css';

import { h } from '../dom';

interface Properties extends Partial<HTMLDivElement> {
  key?: string;
}

export const Loader = (props: Properties) =>
  <div class="loader" {...props}>
    <div class="loader-arc"></div>
  </div>
;
