import { logger } from './logger';

const sendRequest = (method, url, data) => new Promise((resolve, reject) => {
  // https://stackoverflow.com/questions/14873443/sending-an-http-post-using-javascript-triggered-event
  const request = new XMLHttpRequest();

  request.onload = () => {
    const body = request.response || request.responseText;
    try {
      resolve(JSON.parse(body));
    }
    catch (error) {
      reject(body);
    }
  };

  request.onerror = request.ontimeout = () => {
    reject(new Error(`Network request failed`));
  }

  request.open(method, url, true);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.send(data ? JSON.stringify(data) : data);
});

const http = {
  get: (url, data) => sendRequest('GET', url, data),
  post: (url, data) => sendRequest('POST', url, data)
};

const firebase = {
  get: (path) => () => http.get(`${process.env.FIREBASE_DATABASE_URL}/${path}.json`).catch(logger.error)
};

export const Services = {
  sendEmail: (data) => http.post(process.env.EMAIL_SERVICE_URL, data),

  getAvailability: firebase.get('availability'),
  getPosts: firebase.get('posts'),
  getSkills: firebase.get('skills'),
  getTalks: firebase.get('talks')
};
