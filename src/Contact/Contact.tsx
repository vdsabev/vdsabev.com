import './Contact.css';

import { h, classes } from '../dom';
import { RequestStatus } from '../RequestStatus';
import { css } from '../style';

import { ContactModel } from './ContactModel';

const getAvailabilityStyle = (status: string) => ({
  color: status === 'available' ? css.success : css.danger,
});

export const Contact = ({ model, ...props }: { model: ContactModel }) => (
  <section class="contact narrow spacer" {...props}>
    <p>
      I'm currently{' '}
      <b style={getAvailabilityStyle(model.availability.status)}>{model.availability.status}</b> for
      projects and consulting for <b>{model.availability.range}</b>.
    </p>

    <form name="contact" oncreate={model.setFormAction} onsubmit="return false">
      <fieldset
        class={classes({ '--loading': model.status === RequestStatus.pending })}
        disabled={model.status === RequestStatus.pending || model.status === RequestStatus.success}
      >
        <label>
          So, how can I help?
          <textarea
            class="contact__text"
            name="text"
            placeholder="Feel free to introduce yourself, describe your business idea, and how you think I could fit in the project"
            onblur={model.setText}
            value={model.text}
            required
          />
        </label>

        <br />

        <label>
          And how can I reach you?
          <input
            class="contact__email"
            type="email"
            name="email"
            placeholder="Email"
            onblur={model.setEmail}
            value={model.email}
            required
          />
        </label>

        <br />

        <button class="contact__submit" type="submit" onclick={model.submit}>
          SEND
        </button>
      </fieldset>
    </form>

    <div
      class={classes(['contact__success', { '--shown': model.status === RequestStatus.success }])}
    >
      Thanks for reaching out 😊 I'll get back to you soon!
    </div>

    <div class={classes(['contact__error', { '--shown': model.status === RequestStatus.error }])}>
      Oops! Something went wrong 😐 Sorry about that, the error has been logged, I'll see what I can
      do about it. In the meantime, you can still reach me at&nbsp;
      {/* NOTE: Email text is used for mailto body: http://www.angelfire.com/dc/html-webmaster/mailto.htm */}
      <a
        target="_blank"
        rel="noopener"
        href={`mailto:${process.env.EMAIL_ADDRESS}?body=${model.text}`}
      >
        {process.env.EMAIL_ADDRESS}
      </a>
    </div>
  </section>
);
