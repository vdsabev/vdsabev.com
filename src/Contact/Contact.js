import './Contact.css';

/** @jsx h */
import { h } from '../dom';
import { classy } from '../classy';

import { logger } from '../logger';
import { Services } from '../services';
import { css } from '../style';

const getAvailabilityStyle = (status) => ({ color: status === 'available' ? css.success : css.danger });

export const ContactModel = {
  availability: {
    status: '...',
    range: '...'
  },
  pending: false,
  success: false,
  error: false,
  text: '',
  email: '',
  getData: () => (update) => Services.getAvailability().then((availability) => ({ availability })).then(update),

  setText: (model, e) => ({ text: e.currentTarget.value }),
  setEmail: (model, e) => ({ email: e.currentTarget.value }),
  submit(model) {
    if (model.pending || model.success) return;

    if (!model.email) return console.error('Invalid email:', JSON.stringify(model.email));
    if (!model.text) return console.error('Invalid text:', JSON.stringify(model.text));

    model.sendEmail({
      subject: `VDSABEV.COM: New message from ${model.email}`,
      text: model.text
    });

    return {
      pending: true,
      success: false,
      error: false
    };
  },
  sendEmail: (model, message) => (update) => {
    Services.sendEmail(message)
      .then(() => {
        logger.log('contact.success', { message });
        update({ pending: false, success: true });
      })
      .catch(() => {
        logger.error('contact.error', { message });
        update({ pending: false, error: true });
      })
    ;
  }
};

export const Contact = ({ model, ...props }) =>
  <section class="contact narrow spacer" {...props}>
    <p>I'm currently <b style={getAvailabilityStyle(model.availability.status)}>{model.availability.status}</b> for projects and consulting for <b>{model.availability.range}</b>.</p>

    <form name="form" onsubmit="return false">
      <fieldset class={classy({ loading: model.pending })} disabled={model.pending || model.success}>
        <label>
          So, how can I help?
          <textarea
            class="contact-text"
            name="text"
            placeholder="Feel free to introduce yourself, describe your business idea, and how you think I could fit in the project"
            oninput={model.setText}
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
            oninput={model.setEmail}
            required
          />
        </label>

        <br />

        <button class="contact-submit" type="submit" onclick={model.submit}>SEND</button>
      </fieldset>
    </form>

    <div class={classy(['contact-success', { shown: model.success }])}>
      Thanks for reaching out 😊 I'll get back to you soon!
    </div>

    <div class={classy(['contact-error', { shown: model.error }])}>
      Oops! Something went wrong 😐 Sorry about that, the error has been logged, I'll see what I can do about it. And don't worry - you can still reach me at&nbsp;
      {/* NOTE: Email text is used for mailto body: http://www.angelfire.com/dc/html-webmaster/mailto.htm */}
      <a target="_blank" href={`mailto:${process.env.EMAIL_ADDRESS}?body=${model.text}`}>{process.env.EMAIL_ADDRESS}</a>
    </div>
  </section>
;
