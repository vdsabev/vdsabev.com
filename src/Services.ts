import { Availability } from './Contact';
import { Article } from './Article';
import { Skill } from './Skills';

namespace Service {
  export interface Params {
    method: Method;
    url: Url;
    responseType?: ResponseType;
    data?: Data;
  }

  export type Method = 'GET' | 'POST';
  export type Url = string;
  export type ResponseType = 'json';
  export type Data = any;
}

const sendRequest = <T = void>({ method, url, responseType, data }: Service.Params) =>
  new Promise<T>((resolve, reject) => {
    // https://stackoverflow.com/questions/14873443/sending-an-http-post-using-javascript-triggered-event
    const request = new XMLHttpRequest();

    request.onload = () => {
      const body = request.response || request.responseText;

      if (request.status >= 400) {
        reject(body);
      } else if (responseType === 'json') {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(body);
      }
    };

    request.onerror = request.ontimeout = () => {
      reject(new Error('Network request failed'));
    };

    request.open(method, url, true);

    if (typeof data === 'string') {
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send(data);
    } else {
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      request.send(data ? JSON.stringify(data) : data);
    }
  });

const http = {
  get: <T>(url: Service.Url, data?: Service.Data) =>
    sendRequest<T>({ method: 'GET', url, data, responseType: 'json' }),
  post: <T>(url: Service.Url, data: Service.Data) => sendRequest<T>({ method: 'POST', url, data }),
};

const firebase = {
  get: <T>(path: string) => () => http.get<T>(`${process.env.FIREBASE_DATABASE_URL}/${path}.json`),
};

export const Services = {
  sendEmail: (url: string, data: Service.Data) =>
    http.post(url, new URLSearchParams(data).toString()),

  getAvailability: firebase.get<Availability>('availability'),
  getPosts: firebase.get<Article[]>('posts'),
  getSkills: firebase.get<Skill[]>('skills'),
  getTalks: firebase.get<Article[]>('talks'),
};
