export const logger = {
  log(eventName: string, data?: any) {
    sendGoogleAnalyticsEvent(eventName, data);
    if (process.env.NODE_ENV !== 'production') {
      console.log(eventName, data);
    }
  },
  error(eventName: string, data?: any) {
    sendGoogleAnalyticsEvent(eventName, data);
    if (process.env.NODE_ENV !== 'production') {
      console.error(eventName, data);
    }
  }
};

const sendGoogleAnalyticsEvent = (...args: any[]) => {
  if (process.env.NODE_ENV === 'production' && window.ga) {
    window.ga('send', 'event', ...args);
  }
};
