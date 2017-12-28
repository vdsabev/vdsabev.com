import { logger } from '../logger';
import { Services } from '../services';

export class ContactModel {
  availability = {
    status: '...',
    range: '...'
  };
  pending = false;
  success = false;
  error = false;
  text = '';
  email = '';

  async getData(): Promise<Partial<ContactModel>> {
    return { availability: await Services.getAvailability() };
  }

  setText(e: Event): Partial<ContactModel> {
    return { text: (e.currentTarget as HTMLInputElement).value };
  }

  setEmail(e: Event): Partial<ContactModel> {
    return { email: (e.currentTarget as HTMLInputElement).value };
  }

  submit(): Partial<ContactModel> | void {
    if (this.pending || this.success) return;

    if (!this.email) {
      console.error('Invalid email:', JSON.stringify(this.email));
      return;
    }

    if (!this.text) {
      console.error('Invalid text:', JSON.stringify(this.text));
      return;
    }

    this.sendEmail({
      subject: `VDSABEV.COM: New message from ${this.email}`,
      text: this.text
    });

    return {
      pending: true,
      success: false,
      error: false
    };
  }

  async sendEmail(message: { subject: string, text: string }): Promise<Partial<ContactModel>> {
    try {
      await Services.sendEmail(message);
      logger.log('contact.success', { message });
      return { pending: false, success: true };
    }
    catch (error) {
      logger.error('contact.error', { message, error: error && error.message || error });
      return { pending: false, error: true };
    }
  }
}
