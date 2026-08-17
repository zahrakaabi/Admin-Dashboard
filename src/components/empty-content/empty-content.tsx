/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
//

/* -------------------------------------------------------------------------- */
/*                           EMPTY CONTENT COMPONENT                          */
/* -------------------------------------------------------------------------- */
type EmptyContentProps = {
  title?: string;
  imgUrl?: string;
  filled?: boolean;
  description?: string;
  action?: React.ReactNode;
  className?: string
};

function EmptyContent({ title, imgUrl, filled, description, action, className, ...other }: EmptyContentProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center h-full px-6 ${
        filled
        ? 'rounded-xl bg-muted/30 border border-dashed border-border/40'
        : ''
      } ${className}`}
      {...other}
    >
      <img
        alt="empty content"
        src={imgUrl || '/assets/icons/empty/ic_content.svg'}
        className="ww-full max-w-[160px]"
      />

      {title && (
        <span className="mt-2 block text-center text-base font-semibold text-muted-foreground/50">
            {title}
        </span>
      )}

      {description && (
        <span className="mt-2 block text-center text-base font-semibold text-muted-foreground/50">
            {description}
        </span>
      )}

      {action && action}
    </div>
  )
};

export default EmptyContent;