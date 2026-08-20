/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import React from "react";
import { Link } from "react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "../ui";

// UI Local Componnets
import LinkItem from './link-item';

// Types
import type { CustomBreadcrumbsProps } from "./types";

/* -------------------------------------------------------------------------- */
/*                             CUSTOM BREADCRUMBS                             */
/* -------------------------------------------------------------------------- */
function CustomBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast
}: CustomBreadcrumbsProps) {
/* -------------------------------- CONSTANTS ------------------------------- */
  const lastLink = links && links[links.length - 1].name;

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <div className="flex items-center">
        <div className="flex-1">
          {/* HEADING */}
          {heading && <h4 className="text-2xl font-bold mb-2">{heading}</h4> }

          {/* BREADCRUMBS */}
          {!!links?.length && (
            <Breadcrumb>
              <BreadcrumbList>
                {links?.map((link, index) => {
                    const isLast = link.name === lastLink;

                    return (
                        <React.Fragment key={link.name || index}>
                            <BreadcrumbItem>
                                <LinkItem
                                    link={link}
                                    activeLast={activeLast}
                                    disabled={isLast}
                                />
                            </BreadcrumbItem>
                            
                            {index < links.length - 1 && (
                                <BreadcrumbSeparator>
                                    <Separator />
                                </BreadcrumbSeparator>
                            )}
                        </React.Fragment>
                    );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>

        {action && <div className="shrink-0"> {action} </div>}
      </div>

      {/* MORE LINK */}
      {!!moreLink && (
        <div className="mt-2">
          {moreLink.map((href) => (
            <Link
                key={href}
                to={href}
                target="_blank"
                rel="noopener noreferrer"
                className="table text-sm text-primary underline-offset-4 hover:underline"
            >
                {href}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomBreadcrumbs;

/* -------------------------------------------------------------------------- */
/*                                  SEPERATOR                                 */
/* -------------------------------------------------------------------------- */
function Separator() {
/* -------------------------------- RENDERING ------------------------------- */
  return <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/40" />;
};