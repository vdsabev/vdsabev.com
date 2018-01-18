import './Loader.css';

import { h } from '../dom';

interface LoaderProps extends Props<HTMLDivElement> {
  key?: string;
}

export const Loader = (props: LoaderProps) =>
  <div class="loader" {...props}>
    <div class="loader-arc"></div>
  </div>
;
