/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { cn } from '@/lib/utils';

// Utils
import type { ImageProps } from './types';

/* -------------------------------------------------------------------------- */
/*                               IMAGE COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Image = forwardRef<HTMLSpanElement, ImageProps>(
  (
    {
       ratio,
      overlay,
      disabledEffect = false,
      alt,
      src,
      delayTime,
      threshold,
      beforeLoad,
      delayMethod,
      placeholder,
      wrapperProps,
      scrollPosition,
      effect = 'blur',
      visibleByDefault,
      wrapperClassName,
      useIntersectionObserver,
      ...other
    },
    ref
  ) => {
/* --------------------------------- CONSTS --------------------------------- */
    const content = (
      <LazyLoadImage
        alt={alt}
        src={src}
        delayTime={delayTime}
        threshold={threshold}
        beforeLoad={beforeLoad}
        delayMethod={delayMethod}
        placeholder={placeholder}
        wrapperProps={wrapperProps}
        scrollPosition={scrollPosition}
        visibleByDefault={visibleByDefault}
        effect={disabledEffect ? undefined : effect}
        useIntersectionObserver={useIntersectionObserver}
        wrapperClassName={wrapperClassName || 'component-image-wrapper'}
        placeholderSrc={disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.svg'}
      />
    );

/* -------------------------------- RENDERING ------------------------------- */
    return (
      <span
        ref={ref}
        className={cn(
          'relative inline-block overflow-hidden align-bottom',
          
          ratio ? "w-full" : "",

          "[&_span.component-image-wrapper]:w-full",
          "[&_span.component-image-wrapper]:h-full",
          "[&_span.component-image-wrapper]:align-bottom",
          "[&_span.component-image-wrapper]:bg-cover",

          ratio === '1/1' && "aspect-square",
          ratio === '16/9' && "aspect-video",
          ratio === '4/3' && "aspect-[4/3]",
          ratio === '3/4' && "aspect-[3/4]"
        )}
        {...other}
      >
        {content}
        {overlay && (
          <span 
            className="absolute inset-0 z-[1] pointer-events-none" 
            style={{ backgroundColor: overlay }} 
          />
        )}
      </span>
    );
  }
);

Image.displayName = 'Image';

export default Image;