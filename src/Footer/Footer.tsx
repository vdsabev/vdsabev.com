import './Footer.css';

import { h } from '../dom';

const thisYear = new Date().getFullYear();

export const Footer = () => [
  <div class="footer-stripe" />,

  <footer class="footer">
    <div class="footer-content narrow">
      <p>&copy; {thisYear} Vladimir Sabev</p>
      <p>
        Illustration by{' '}
        <a target="_blank" href="https://www.behance.net/s-pov">
          @spovv
        </a>
      </p>
    </div>
  </footer>,
];
