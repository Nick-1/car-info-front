export interface Image {
  darkModeImageUrl?: null | string;
  id?: null | number;
  originalImageUrl?: null | string;
  placeholder?: boolean;
  resizableUrlTemplate?: string;
  thumbnails?: Thumbnails;
  verified?: boolean;
}

export interface Thumbnails {
  '32x32'?: string;
  '50x30'?: string;
  '84x84'?: string;
  '100x60'?: string;
  '170x102'?: string;
  '170x125'?: string;
  '225x225'?: string;
  '300x300'?: string;
  '574x343'?: string;
  '620x372'?: string;
}
