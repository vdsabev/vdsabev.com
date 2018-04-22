import { RequestStatus } from '../RequestStatus';

export class PageModel {
  readonly statuses: Record<string, RequestStatus> = {};
  readonly errors: Error[] = [];

  async resolve(path: string, resolve: () => Promise<any>) {
    try {
      this.setStatus(path, RequestStatus.pending);
      this.clearErrors();
      await delayedRetry({ delay: 3000, take: 3, resolve });
      this.setStatus(path, RequestStatus.success);
    }
    catch (error) {
      this.setStatus(path, RequestStatus.error);
      this.addError(error);
      throw error;
    }
  }

  private setStatus(path: string, status: RequestStatus): Partial<PageModel> {
    return { statuses: { [path]: status } };
  }

  private addError(error: Error): Partial<PageModel> {
    return { errors: [...this.errors, error] };
  }

  private clearErrors(): Partial<PageModel> {
    return { errors: [] };
  }
}

const delayedRetry = async (
  options: { delay: number; take: number; resolve: () => Promise<any> },
  attempt = 1,
): Promise<any> => {
  try {
    return await options.resolve();
  }
  catch (error) {
    if (attempt >= options.take) {
      throw error;
    }
    await delay(options.delay);
    return delayedRetry(options, attempt + 1);
  }
};

const delay = (milliseconds: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, milliseconds));
