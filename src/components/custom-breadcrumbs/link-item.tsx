/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Link } from 'react-router';

// Utils
import { cn } from '@/lib/utils';
import type { BreadcrumbsLinkProps } from './types';

/* -------------------------------------------------------------------------- */
/*                         BREADCRUMBS LINK COMPOENNT                         */
/* -------------------------------------------------------------------------- */
type Props = {
  link: BreadcrumbsLinkProps;
  activeLast?: boolean;
  disabled: boolean;
};

function BreadcrumbsLink({ link, activeLast, disabled }: Props) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const isDisabled = disabled && !activeLast;

  const renderContent = (
    <>
      {link.icon && (
        <span className="mr-2 inline-inherit [&_svg]:h-5 [&_svg]:w-5">
          {link.icon}
        </span>
      )}

      {link.name}
    </>
  );

  if (link.href) {
    return (
      <Link
        to={link.href}
        className={cn(
            "inline-flex items-center text-sm text-foreground hover:underline",
            disabled && !activeLast && "pointer-events-none cursor-default text-muted-foreground/50"
        )}
      >
        {renderContent}
      </Link>
    );
  }

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div
        className={cn(
            "inline-flex items-center text-sm text-foreground",
            isDisabled && "pointer-events-none cursor-default text-muted-foreground/50"
        )}
    >
        {renderContent}
    </div>
  );
};

export default BreadcrumbsLink;