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
    <div class="about__content">
      <img class="about__picture" src="picture.jpg" alt="Vlad Sabev" />

      <div class="about__statement">
        <p>I believe work should be engaging, fulfilling, and meaningful.</p>

        <p>
          By using the right tool for each job, constantly refining my approach, and keeping in mind
          the business value for my clients, I strive to create the best web applications possible.
        </p>

        <p>
          With exposure to a wide range of technologies, I currently specialize in developing
          modern {Specialization(model.specializations.spa)} for the web.
        </p>
      </div>

      <div class="about__social">{model.socialLinks.map(SocialLink)}</div>
    </div>
  </section>
);

const Specialization = (specialization: Specialization) => (
  <abbr title={specialization.description}>{specialization.name}</abbr>
);

const SocialLink = (link: SocialLink) => (
  <a class="inline-block" target="_blank" rel="noopener" href={link.url} title={link.name}>
    <img class="about__socialIcon" src={link.icon} alt={link.name} />
  </a>
);
