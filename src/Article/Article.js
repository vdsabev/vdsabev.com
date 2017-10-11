import './Article.css';

/** @jsx h */
import { h } from 'hyperapp';
import markdown from 'snarkdown';

import { dangerouslySetInnerHTML } from '../utils';

export const Articles = (articles) => {
  const formattedArticles = formatArticles(articles);
  return () =>
    <section class="articles narrow spacer">
      {formattedArticles.map(Article)}
    </section>
  ;
};

const Article = (article) =>
  <article key={article.url} class="article-item">
    <a target="_blank" href={article.url} class="article-item-title">{article.title}</a>
    <p class="article-item-text" oncreate={dangerouslySetInnerHTML(article.description)}></p>
    <time datetime={article.date} class="article-item-date">{new Date(article.date).toDateString()}</time>
  </article>
;

const formatArticles = (articles) => safelyReverse(articles).map(convertDescriptionToMarkdown);
const safelyReverse = (array) => array.slice().reverse();
const convertDescriptionToMarkdown = (talk) => ({ ...talk, description: markdown(talk.description) });
