import { RequestStatus } from '../RequestStatus';

export class PageModel {
  private readonly retryAfter = 3 * 1000;
  private readonly retryCount = 3;
  private readonly errorsCounter: Record<string, number> = {};
  readonly statuses: Record<string, RequestStatus> = {};
  readonly errors: Error[] = [];

  private lastResolvedPath: string | undefined;
  private retryTimeoutId: number | undefined;

  async resolve(path: string, resolve: () => Promise<any>) {
    try {
      if (this.lastResolvedPath !== path) {
        clearTimeout(this.retryTimeoutId);
        this.clearErrors();
        this.lastResolvedPath = path;
      }

      this.setStatus(path, RequestStatus.pending);
      await resolve();
      this.setStatus(path, RequestStatus.success);
    } catch (error) {
      this.setStatus(path, RequestStatus.error);

      this.addError(error);

      if (this.errorsCounter[path] == null) {
        this.errorsCounter[path] = 0;
      }
      this.errorsCounter[path]++;

      if (this.errorsCounter[path] < this.retryCount) {
        this.retryTimeoutId = setTimeout(() => this.resolve(path, resolve), this.retryAfter);
      }
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
