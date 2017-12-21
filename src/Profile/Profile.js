import './avatar.svg';

import './Profile.css';

/** @jsx h */
import { h } from '../dom';

export const Profile = () =>
  <section class="profile narrow">
    <img class="profile-avatar" src="avatar.svg" alt="Vladimir Sabev's Avatar" />
    <div class="profile-text">
      <h1 class="profile-title">Vladimir Sabev</h1>
      <p class="profile-subtitle">&lt;Freelance Web Developer /&gt;</p>
    </div>
  </section>
;
