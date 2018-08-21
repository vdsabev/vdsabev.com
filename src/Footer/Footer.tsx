import './Footer.css';

import { h } from '../dom';

const thisYear = new Date().getFullYear();

export const Footer = () => [
  <div class="footerStripe" />,

  <footer class="footer">
    <div class="footer__content narrow">
      <p>&copy; {thisYear} Vladimir Sabev</p>
      <p>
        Illustration by{' '}
        <a class="footer__link" target="_blank" rel="noopener" href="https://www.behance.net/s-pov">
          @spovv
        </a>
      </p>
    </div>
  </footer>,
];
