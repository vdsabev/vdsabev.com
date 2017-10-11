const style = {};

style.animationDuration = 0.4;

style.fonts = {
  profile: 'Acme',
  text: 'PT Sans'
};

style.css = {
  animationDuration: `${style.animationDuration}s`,
  animationEasing: 'cubic-bezier(0.25, 1, 0.25, 1)',
  animationElastic: 'cubic-bezier(0.5, 2, 0.5, 0.5)',

  fontProfile: style.fonts.profile,
  fontText: style.fonts.text,

  foregroundLight: '#999999',
  foreground: '#666666',
  foregroundDark: '#333333',
  foregroundDarker: '#000000',

  neutralLighter: '#ffffff',
  neutralLight: '#ecf0f1',
  neutral: '#bdc3c7',
  neutralDark: '#95a5a6',

  primary: '#34495e',
  success: '#2ecc71',
  danger: '#e74c3c',
  info: '#3498db'
};

// Export for both Node.js and the browser
(function (exports) {
  Object.assign(exports, style);
}(typeof exports === 'undefined' ? (this.moduleName = {}) : exports));
