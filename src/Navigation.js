import './Navigation.css';

/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

export const Navigation = ({ currentPage, setCurrentPage }) =>
  <header class="navigation narrow">
    {pages.map(PageLink({
      currentPage,
      setCurrentPage: (...args) => {
        setCurrentPage(...args);
        return false;
      }
    }))}
  </header>
;

const pages = [
  { name: 'contact', text: 'Contact' },
  { name: 'posts', text: 'Posts' }
];

const PageLink = ({ currentPage, setCurrentPage }) => (page) =>
  <a
    href={`/${page.name}`}
    class={classy(['navigation-page-link', { active: currentPage === page.name }])}
    onclick={() => setCurrentPage(page.name)}
  >
    {page.text}
  </a>
;
