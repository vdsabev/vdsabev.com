const animationDuration = 0.4;

const variables = {
  animationDuration: `${animationDuration}s`,
  animationEasing: 'cubic-bezier(0.25, 1, 0.25, 1)',
  animationElastic: 'cubic-bezier(0.5, 2, 0.5, 0.5)'
};

// Export for both Node.js and the browser
(function (exports) {
  exports.animationDuration = animationDuration;
  exports.variables = variables;
}(typeof exports === 'undefined' ? (this.moduleName = {}) : exports));
