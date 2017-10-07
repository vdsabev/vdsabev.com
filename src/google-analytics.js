export const sendGoogleAnalyticsEvent = (...args) => {
  if (window.ga && process.env.NODE_ENV === 'production') {
    window.ga('send', 'event', ...args);
  }
};
