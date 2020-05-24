import './Footer.css';

import { h } from '../dom';

const thisYear = new Date().getFullYear();

export const Footer = () => (
  <footer class="footer">
    <div class="footer__content narrow">
      <p>&copy; {thisYear} Vlad Sabev</p>
      <p>
        Illustration by{' '}
        <a class="footer__link" target="_blank" rel="noopener" href="https://www.behance.net/s-pov">
          @spovv
        </a>
      </p>
    </div>
  </footer>
);
