import './Loader.css';

/** @jsx h */
import { h } from 'hyperapp';

export const Loader = (props) =>
  <div class="loader" {...props}>
    <div class="loader-arc"></div>
  </div>
;
