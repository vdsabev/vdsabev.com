import './Article.css';

import { h } from '../dom';
import { Article } from './ArticleModel';

interface ArticlesProps extends Props<HTMLDivElement> {
  articles: Article[];
}

export const Articles = ({ articles, ...props }: ArticlesProps) =>
  <section class="articles narrow spacer" {...props}>
    {articles.map(Article)}
  </section>
;

const Article = (article: Article) =>
  <article key={article.url} class="article-item">
    <a target="_blank" href={article.url} class="article-item-title">{article.title}</a>
    <p class="article-item-text">{article.description}</p>
    <time dateTime={article.date} class="article-item-date">{new Date(article.date).toDateString()}</time>
  </article>
;
