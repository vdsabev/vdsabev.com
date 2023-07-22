import ReactDOM from 'react-dom/client';

import './main.css';

import avatar from './avatar.svg';

import About from './About';

const App = () => {
  return (
    <div className="max-w-3xl mx-auto font-text">
      <section className="my-12 text-center">
        <img src={avatar} className="inline-block max-h-44 m-6" />
        <div className="mt-3 font-title">
          <h1 className="text-5xl">Vlad Sabev</h1>
          <p className="text-2xl mt-2">&lt;Freelance Web Developer /&gt;</p>
        </div>
      </section>

      <About />
    </div>
  );
};

// Render
ReactDOM.createRoot(document.querySelector('main') as HTMLElement).render(
  <App />
);
