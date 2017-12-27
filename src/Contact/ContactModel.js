import { logger } from '../logger';
import { Services } from '../services';

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
  getData() {
    return Services.getAvailability().then((availability) => ({ availability }));
  },

  setText: (e) => ({ text: e.currentTarget.value }),
  setEmail: (e) => ({ email: e.currentTarget.value }),
  submit() {
    if (this.pending || this.success) return;

    if (!this.email) return console.error('Invalid email:', JSON.stringify(this.email));
    if (!this.text) return console.error('Invalid text:', JSON.stringify(this.text));

    this.sendEmail({
      subject: `VDSABEV.COM: New message from ${this.email}`,
      text: this.text
    });

    return {
      pending: true,
      success: false,
      error: false
    };
  },
  sendEmail(message) {
    return Services.sendEmail(message).then(() => {
      logger.log('contact.success', { message });
      return { pending: false, success: true };
    }).catch(() => {
      logger.error('contact.error', { message });
      return { pending: false, error: true };
    });
  }
};
