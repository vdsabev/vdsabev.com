import './Article.css';

/** @jsx h */
import { h } from 'hyperapp';

export const Articles = (articles) => {
  const formattedArticles = articles.slice().reverse();
  return () =>
    <section class="articles narrow spacer">
      {formattedArticles.map(Article)}
    </section>
  ;
};

const Article = (article) =>
  <article key={article.url} class="article-item">
    <a target="_blank" href={article.url} class="article-item-title">{article.title}</a>
    <p class="article-item-text">{article.description}</p>
    <time datetime={article.date} class="article-item-date">{new Date(article.date).toDateString()}</time>
  </article>
;
