import './picture.jpg';

import './github-square.svg';
import './twitter-square.svg';
import './medium.svg';
import './linkedin.svg';

import './About.css';

import { h } from '../dom';
import { AboutModel, Specialization, SocialLink } from './AboutModel';

export const About = ({ model }: { model: AboutModel }) => (
  <section class="about narrow spacer">
    <div class="about-content">
      <img class="about-picture" src="picture.jpg" alt="Vladimir Sabev" />

      <div class="about-statement">
        <p>I believe work should be engaging, fulfilling, and meaningful.</p>
        <p>
          By using the right tool for each job, constantly refining my approach, and keeping in mind the business value
          for my clients, I strive to create the best web applications possible.
        </p>
        <p>
          After more than {model.yearsOfExperience} years of professional experience and exposure to a wide range of
          technologies, I currently specialize in {model.specializations.map(Specialization)}.
        </p>
      </div>

      <div class="about-social">{model.socialLinks.map(SocialLink)}</div>
    </div>
  </section>
);

const Specialization = (specialization: Specialization, index: number, array: Specialization[]) => [
  index < array.length - 1 ? null : 'and ',
  <abbr title={specialization.description}>{specialization.name}</abbr>,
  index < array.length - 1 ? ', ' : null,
];

const SocialLink = (link: SocialLink) => (
  <a class="inline-block" target="_blank" href={link.url} title={link.name}>
    <img class="about-social-icon" src={link.icon} alt={link.name} />
  </a>
);
