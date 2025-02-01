import './Article.css';

import { h } from '../dom';
// import { Image } from '../Image';
import { ArticleModel } from './ArticleModel';

interface ArticlesProps extends Props {
  articles: Record<string, ArticleModel>;
}

export const Articles = ({ articles, ...props }: ArticlesProps) => (
  <section class="articles narrow spacer" {...props}>
    {Object.keys(articles).map((key) => (
      <Article key={key} article={articles[key]} />
    ))}
  </section>
);

// const getPreviewUrl = (url: string) => placeholderImageUrl;
//   `${process.env.PREVIEW_SERVICE_URL}?url=${encodeURIComponent(
//     url
//   )}&deviceScaleFactor=0.25&type=jpeg&quality=50`;

interface ArticleProps extends Props {
  article: ArticleModel;
}

const Article = ({ article, ...props }: ArticleProps) => (
  <article class="article" {...props}>
    {/* <a target="_blank" rel="noopener" href={article.url}>
      <Image class="article__img" src={getPreviewUrl(article.url)} model={article.image} />
    </a> */}

    <div>
      <a target="_blank" rel="noopener" href={article.url} class="article__title">
        {article.title}
      </a>

      <p class="article__text">{article.description}</p>

      <time dateTime={article.date} class="article__date">
        {new Date(article.date).toDateString()}
      </time>
    </div>
  </article>
);
