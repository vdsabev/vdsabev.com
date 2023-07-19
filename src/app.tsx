import ReactDOM from 'react-dom/client';

import './main.css';

const App = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="my-12 text-center">
        <img src="avatar.svg" className="inline-block max-h-44 m-6" />
        <div className="font-title">
          <h1 className="text-5xl">Vlad Sabev</h1>
          <p className="text-2xl mt-3">&lt;Freelance Web Developer /&gt;</p>
        </div>
      </section>
    </div>
  );
};

// Render
ReactDOM.createRoot(document.querySelector('main') as HTMLElement).render(
  <App />
);
