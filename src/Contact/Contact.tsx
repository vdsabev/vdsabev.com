import './Contact.css';

/** @jsx h */
import { h } from '../dom';
import { classy } from '../classy';
import { css } from '../style';

import { ContactModel } from './ContactModel';

const getAvailabilityStyle = (status) => ({ color: status === 'available' ? css.success : css.danger });

export const Contact = ({ model, ...props }: { model: ContactModel }) =>
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
