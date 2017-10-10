export const logger = {
  log(eventName, data) {
    sendGoogleAnalyticsEvent(eventName, data);
    if (process.env.NODE_ENV !== 'production') {
      console.log(eventName, data);
    }
  },
  error(eventName, data) {
    sendGoogleAnalyticsEvent(eventName, data);
    if (process.env.NODE_ENV !== 'production') {
      console.error(eventName, data);
    }
  }
};

const sendGoogleAnalyticsEvent = (...args) => {
  if (window.ga && process.env.NODE_ENV === 'production') {
    window.ga('send', 'event', ...args);
  }
};
