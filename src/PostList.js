/** @jsx h */
import { app, h } from 'hyperapp';

export const PostList = () =>
  <section id="post-list" class="post-list narrow">
    {posts.map(PostItem)}
  </section>
;

// TODO: Move to Firestore
const posts = [
  {
    url: 'https://medium.com/@vdsabev/exploring-unidirectional-components-in-mithril-part-1-hyperapp-e33ce35a224',
    title: 'Exploring Unidirectional Components in Mithril (part 1 — Hyperapp)',
    description: 'I’ve wanted to try writing UI components using a unidirectional data flow for a while — mostly as an exercise, but also with the hope that it will be easier to understand and reason about the data. And whether it would work out well or not, doing such an experiment would at the very least be a valuable learning experience.',
    created: '2017-08-18T08:48:05.030Z'
  },

  {
    url: 'https://medium.com/@vdsabev/simplify-your-layout-and-your-life-with-css-grid-b9a2971a5649',
    title: 'Simplify Your Layout (And Your Life) With CSS Grid',
    description: 'How emerging web technologies enable new ways of approaching design and layout',
    created: '2017-08-31T10:51:57.997Z'
  },

  {
    url: 'https://medium.com/@vdsabev/exploring-unidirectional-components-in-mithril-part-2-redux-452ed957df70',
    title: 'Exploring Unidirectional Components in Mithril (part 2— Redux)',
    description: 'In part 1 of this post, I described how we could morph the Mithril library into a Hyperapp lookalike to achieve unidirectional data flow. This time, I will use Redux with the reducer pattern instead, and compare the resulting code to the Hyperapp architecture.',
    created: '2017-10-09T09:18:39.355Z'
  }
].reverse();

const PostItem = (post) =>
  <article class="post-item">
    <a target="_blank" href={post.url} class="post-item-title">{post.title}</a>
    <p class="post-item-text">{post.description}</p>
    <time datetime={post.created} class="post-item-date">{new Date(post.created).toDateString()}</time>
  </article>
;
