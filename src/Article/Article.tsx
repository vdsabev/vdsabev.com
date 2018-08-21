import './Article.css';

import { h } from '../dom';
import { Article } from './ArticleModel';

interface ArticlesProps extends Props {
  articles: Article[];
}

export const Articles = ({ articles, ...props }: ArticlesProps) => (
  <section class="articles narrow spacer" {...props}>
    {articles.map(Article)}
  </section>
);

const Article = (article: Article) => (
  <article key={article.url} class="article">
    <a target="_blank" rel="noopener" href={article.url} class="article__title">
      {article.title}
    </a>
    <p class="article__text">{article.description}</p>
    <time dateTime={article.date} class="article__date">
      {new Date(article.date).toDateString()}
    </time>
  </article>
);
