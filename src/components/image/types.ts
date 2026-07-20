/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import type { LazyLoadImageProps } from 'react-lazy-load-image-component';
import type React from 'react';

/* -------------------------------------------------------------------------- */
/*                             IMAGE RATIO & PROPS                            */
/* -------------------------------------------------------------------------- */
export type ImageRatio = '4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1';

export interface ImageProps
  extends React.ComponentPropsWithoutRef<'span'>,
    Omit<LazyLoadImageProps, keyof React.ComponentPropsWithoutRef<'span'>> {
  overlay?: string;
  ratio?: ImageRatio;
  disabledEffect?: boolean;
}