export enum ImageLoadingStatus {
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export class ImageModel {
  status = ImageLoadingStatus.loading;

  setStatus(status: ImageLoadingStatus): Partial<ImageModel> {
    return { status };
  }
}
