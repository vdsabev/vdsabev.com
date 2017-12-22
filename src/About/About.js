import './picture.jpg';

import './github-square.svg';
import './twitter-square.svg';
import './medium.svg';
import './linkedin.svg';

import './About.css';

/** @jsx h */
import { h } from '../dom';

const yearIStartedWorking = 2010;
const thisYear = new Date().getFullYear();
const yearsOfExperience = thisYear - yearIStartedWorking;

export const About = () =>
  <section class="about narrow spacer">
    <div class="about-content">
      <img class="about-picture" src="picture.jpg" alt="Vladimir Sabev" />

      <div class="about-statement">
        <p>I believe work should be engaging, fulfilling, and meaningful.</p>
        <p>
          By using the right tool for each job,
          constantly refining my approach,
          and keeping in mind the business value for my clients,
          I strive to create the best web applications possible.
        </p>
        <p>
          After more than {yearsOfExperience} years of professional experience and exposure to a wide range of technologies,
          I currently specialize in {specializations.map(Specialization)}.
        </p>
      </div>

      <div class="about-social">
        {socialLinks.map(SocialLink)}
      </div>
    </div>
  </section>
;

// NOTE: Should be >= 3 for enumerating like "a, b, and c" to work
const specializations = [
  { name: 'single-page applications', description: 'A single-page application (SPA) is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server. This approach avoids interruption of the user experience between successive pages, making the application behave more like a desktop application.' },
  { name: 'progressive web applications', description: 'Progressive Web Apps, also known as Installable Web Apps or Hybrid Web Apps, are regular web pages or websites, but can appear to the user like traditional applications or native mobile applications. The application type attempts to combine features offered by most modern browsers with the benefits of mobile experience.' },
  { name: 'serverless computing', description: 'Serverless computing is a cloud computing execution model in which the cloud provider dynamically manages the allocation of machine resources. Pricing is based on the actual amount of resources consumed by an application, rather than on pre-purchased units of capacity. It is a form of utility computing.' }
];

const Specialization = (specialization, index, array) => [
  index < array.length - 1 ? null : 'and ',
  <abbr title={specialization.description}>{specialization.name}</abbr>,
  index < array.length - 1 ? ', ' : null
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/vdsabev', icon: 'github-square.svg' },
  { name: 'Twitter', url: 'https://twitter.com/vdsabev', icon: 'twitter-square.svg' },
  { name: 'Medium', url: 'https://medium.com/@vdsabev', icon: 'medium.svg' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/vdsabev', icon: 'linkedin.svg' }
];

const SocialLink = (link) =>
  <a class="inline-block" target="_blank" href={link.url} title={link.name}>
    <img class="about-social-icon" src={link.icon} alt={link.name} />
  </a>
;
