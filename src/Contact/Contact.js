import './Contact.css';

/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

import { logger } from '../logger';
import { Services } from '../services';
import { css } from '../style';

const getAvailabilityStyle = (status) => ({ color: status === 'available' ? css.success : css.danger });

export const ContactModule = {
  state: {
    availability: {
      status: '...',
      range: '...'
    },
    pending: false,
    success: false,
    error: false,
    text: '',
    email: ''
  },
  actions: {
    getData: () => (update) => Services.getAvailability().then((availability) => ({ availability })).then(update),
    setText: (state, actions, e) => ({ text: e.currentTarget.value }),
    setEmail: (state, actions, e) => ({ email: e.currentTarget.value }),
    submit(state, actions) {
      if (state.pending || state.success) return;

      if (!state.email) return console.error('Invalid email:', JSON.stringify(state.email));
      if (!state.text) return console.error('Invalid text:', JSON.stringify(state.text));

      actions.sendEmail({
        subject: `VDSABEV.COM: New message from ${state.email}`,
        text: state.text
      });

      return {
        pending: true,
        success: false,
        error: false
      };
    },
    sendEmail: (state, actions, message) => (update) => {
      // TODO: Extract to `Services` and maybe rewrite with `fetch`, or rewrite fetch` with `XMLHttpRequest`
      // https://stackoverflow.com/questions/14873443/sending-an-http-post-using-javascript-triggered-event
      const request = new XMLHttpRequest();

      request.addEventListener('load', () => {
        logger.log('contact.success', { message });
        update({ pending: false, success: true });
      });

      request.addEventListener('error', () => {
        logger.error('contact.error', { message });
        update({ pending: false, error: true });
      });

      request.open('POST', process.env.EMAIL_SERVICE_URL, true);
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      request.send(JSON.stringify(message));
    }
  }
};

export const Contact = ({ state, actions, ...props }) =>
  <section class="contact narrow spacer" oncreate={actions.getData} {...props}>
    <p>I'm currently <b style={getAvailabilityStyle(state.availability.status)}>{state.availability.status}</b> for projects and consulting for <b>{state.availability.range}</b>.</p>

    <form name="form" onsubmit="return false">
      <fieldset class={classy({ loading: state.pending })} disabled={state.pending || state.success}>
        <label>
          So, how can I help?
          <textarea
            class="contact-text"
            name="text"
            placeholder="Feel free to introduce yourself, describe your business idea, and how you think I could fit in the project"
            oninput={actions.setText}
            required
          ></textarea>
        </label>

        <br />

        <label>
          And how can I reach you?
          <input
            class="contact-email"
            type="email"
            name="email"
            placeholder="Email"
            oninput={actions.setEmail}
            required
          />
        </label>

        <br />

        <button class="contact-submit" type="submit" onclick={actions.submit}>SEND</button>
      </fieldset>
    </form>

    <div class={classy(['contact-success', { shown: state.success }])}>
      Thanks for reaching out 😊 I'll get back to you soon!
    </div>

    <div class={classy(['contact-error', { shown: state.error }])}>
      Oops! Something went wrong 😐 Sorry about that, the error has been logged, I'll see what I can do about it. And don't worry - you can still reach me at&nbsp;
      {/* NOTE: Email text is used for mailto body: http://www.angelfire.com/dc/html-webmaster/mailto.htm */}
      <a target="_blank" href={`mailto:${process.env.EMAIL_ADDRESS}?body=${state.text}`}>{process.env.EMAIL_ADDRESS}</a>
    </div>
  </section>
;
