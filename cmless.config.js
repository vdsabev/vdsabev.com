const defineConfig = require('cmless');

const yearStartedWorking = 2010;
const yearsOfExperience = new Date().getFullYear() - yearStartedWorking;

const config = {
  theme: false,
  reset: false,

  title: 'Vlad Sabev - Web Developer',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 110 110%22><text y=%22.9em%22 font-size=%2290%22>⭐</text></svg>',
    },
  ],
  meta: {
    author: 'Vlad Sabev',
    description: `A versatile software engineer with a penchant for front end development and more than ${yearsOfExperience} years of experience in implementing custom web solutions.`,
  },
  fonts: {
    title: 'Acme',
    text: 'PT Sans',
  },

  forms: {
    contact: {
      text: { tagName: 'textarea' },
      email: { tagName: 'input', type: 'email' },
    },
  },
};

module.exports = defineConfig(config);
module.exports.config = config;
