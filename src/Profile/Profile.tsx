import './avatar.svg';

import './Profile.css';

import { h } from '../dom';

export const Profile = () => (
  <section class="profile narrow">
    <img class="profile__avatar" src="avatar.svg" alt="Vlad Sabev's Avatar" />
    <div class="provile__text">
      <h1 class="provile__title">Vlad Sabev</h1>
      <p class="provile__subtitle">&lt;Freelance Web Developer /&gt;</p>
    </div>
  </section>
);
