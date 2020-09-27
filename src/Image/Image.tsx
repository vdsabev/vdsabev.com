import './placeholder.gif';
const placeholderImageUrl = 'placeholder.gif';

import { h } from '../dom';
import { ImageModel, ImageLoadingStatus } from './ImageModel';

interface ImageProps extends Props<HTMLImageElement> {
  model: ImageModel;
}

export const Image = ({ model, src, ...props }: ImageProps) => (
  <img
    {...props}
    src={model.status === ImageLoadingStatus.loading ? placeholderImageUrl : src}
    onload={() => model.setStatus(ImageLoadingStatus.success)}
    onerror={() => model.setStatus(ImageLoadingStatus.error)}
  />
);
