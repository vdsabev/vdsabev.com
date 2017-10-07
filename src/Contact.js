/** @jsx h */
import { h } from 'hyperapp';
import classy from 'classwrap';

// TODO: Move to Firestore
const availableStyle = { color: '#27ae60' };
const availableStatus = 'available';
const availableRange = 'Q4 2017 / Q1 2018';
const myEmailAddress = 'vdsabev@gmail.com';

// TODO: Move to configuration
const sendEmailUrl = 'https://us-central1-vladimir-sabev.cloudfunctions.net/sendEmail';

export const Contact = {
  state: {
    pending: false,
    success: false,
    error: false,
    text: '',
    email: ''
  },
  actions: {
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
      // https://stackoverflow.com/questions/14873443/sending-an-http-post-using-javascript-triggered-event
      const request = new XMLHttpRequest();

      request.addEventListener('load', () => {
        logEvent('contact.success', { message });
        update({ pending: false, success: true });
      });

      request.addEventListener('error', () => {
        debugger;
        console.error(request);
        logEvent('contact.error', { message });
        update({ pending: false });
      });

      request.open('POST', sendEmailUrl, true);
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      request.send(JSON.stringify(message));
    }
  },
  view: ({ state, actions }) =>
    <section id="contact" class="contact narrow">
      <h1 class="contact-title">Contact</h1>
      <p>I'm currently <b style={availableStyle}>{availableStatus}</b> for projects and consulting for <b>{availableRange}</b>.</p>

      <form name="form" onsubmit="return false">
        <fieldset id="contact-fieldset" disabled={state.pending || state.success}>
          <label>
            So, how can I help?
            <textarea
              id="contact-text"
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
              id="contact-email"
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

      <div id="contact-success" class={classy({ shown: state.success })}>
        Thanks for reaching out 😊 I'll get back to you soon!
      </div>

      <div id="contact-error" class={classy({ shown: state.error })}>
        Oops! Something went wrong 😐 The error has been logged - I'll see what I can do about it.
        {/* TODO: Send contact-text value as mailto text: http://www.angelfire.com/dc/html-webmaster/mailto.htm */}
        And don't worry - you can still reach me at <a target="_blank" href={`mailto:${myEmailAddress}`}>{myEmailAddress}</a>
      </div>
    </section>
};

const logEvent = (...args) => {
  if (window.ga) {
    window.ga('send', 'event', ...args);
  }
};
