import './assets/avatar.svg';

/** @jsx h */
import { app, h } from 'hyperapp';

export const Profile = () =>
  <section id="profile" class="profile narrow">
    <img class="profile-avatar" src="avatar.svg" alt="Vladimir Sabev's Avatar" />
    <div class="profile-text">
      <h1 class="profile-title">Vladimir Sabev</h1>
      <p class="profile-subtitle">&lt;Freelance Web Developer /&gt;</p>
    </div>
  </section>
;
