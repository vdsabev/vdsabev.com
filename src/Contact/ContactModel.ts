import { logger } from '../logger';
import { RequestStatus } from '../RequestStatus';
import { Services } from '../Services';

export interface Availability {
  status: string;
  range: string;
}

export class ContactModel {
  availability = {
    status: '...',
    range: '...',
  };
  status: RequestStatus | undefined;
  text = '';
  email = '';

  async getData(): Promise<Partial<ContactModel>> {
    const availability = await Services.getAvailability();
    return { availability };
  }

  setText(e: Event): Partial<ContactModel> {
    return { text: (e.currentTarget as HTMLInputElement).value };
  }

  setEmail(e: Event): Partial<ContactModel> {
    return { email: (e.currentTarget as HTMLInputElement).value };
  }

  submit(): Partial<ContactModel> | void {
    if (this.status === RequestStatus.pending || this.status === RequestStatus.success) return;

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
      text: this.text,
    });

    return { status: RequestStatus.pending };
  }

  async sendEmail(message: { subject: string; text: string }): Promise<Partial<ContactModel>> {
    try {
      await Services.sendEmail(message);
      logger.log('contact.success', { message });
      return { status: RequestStatus.success };
    } catch (error) {
      logger.error('contact.error', { message, error: (error && error.message) || error });
      return { status: RequestStatus.error };
    }
  }
}
