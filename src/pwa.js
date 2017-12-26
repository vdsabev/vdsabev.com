const { css } = require('./style');

const pwa = {
  short_name: 'vdsabev.com',
  name: 'Vladimir Sabev',
  description: 'Freelance Web Developer',
  background_color: css.neutralLighter,
  theme_color: css.primary
};

// Export for both Node.js and the browser
(function (exports) {
  Object.keys(pwa).forEach((key) => exports[key] = pwa[key]);
}(typeof exports === 'undefined' ? (this.moduleName = {}) : exports));
