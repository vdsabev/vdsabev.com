/** @jsx h */
import { app, h } from 'hyperapp';

const thisYear = new Date().getFullYear();

export const Footer = () => [
  <div class="footer-stripe"></div>,
  <footer id="footer">
    <div class="footer-content narrow">
      <p>&copy; {thisYear} Vladimir Sabev</p>
      <p>Illustration by <a target="_blank" href="https://twitter.com/spovv">@spovv</a></p>
    </div>
  </footer>
];
