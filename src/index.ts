declare global {
  interface Window {
    ga: Function;
  }

  const process: {
    env: Record<string, string | number>
  };
}

import './favicon.png';
import './style.css';
import './App';
