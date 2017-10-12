/** @jsx h */
import { h } from 'hyperapp';
import { Articles } from '../Article';

// TODO: Move to Firebase Database
const talks = [
  {
    url: 'https://dev.bg/събитие/как-да-оценяваме-времето-и-труда-си-кат',
    title: '[Bulgarian] DEV.BG: How to value our time and work as freelancers',
    date: '2017-07-24T16:30:00.000Z'
  },

  {
    url: 'https://dev.bg/събитие/it-freelance-изготвяне-на-оферта-от-0-до-100/',
    title: '[Bulgarian] DEV.BG: Making an offer from 0 to 100%',
    date: '2017-10-23T16:30:00.000Z'
  }
];

export const Talks = Articles(talks);
