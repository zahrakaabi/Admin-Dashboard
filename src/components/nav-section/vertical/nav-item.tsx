// /* -------------------------------------------------------------------------- */
// /*                                DEPENDENCIES                                */
// /* -------------------------------------------------------------------------- */
// // Packages
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

// UI Lib Components
import { 
    Button,
    Collapsible,
    CollapsibleContent,
} from "@/components/ui";
import { ChevronDown } from "lucide-react";

// Utils
import type { NavItemBaseProps, NavItemProps } from '../types';

// /* -------------------------------------------------------------------------- */
// /*                             NAV ITEM COMPONENT                             */
// /* -------------------------------------------------------------------------- */
function NavItem({
    open, 
    title,
    path,
    active,
    icon,
    info,
    externalLink,
    hasChild,
    children,
    onToggle
}: NavItemProps) {
/* -------------------------------- CONSTANTS ------------------------------- */
   const content = (
        <Button  variant="ghost"
        onClick={hasChild ? onToggle : undefined}
        className={cn(
            "w-full flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 text-gray-600 text-sm font-medium transition-all duration-200",
            "hover:bg-gray-100 hover:text-gray-600",
            (open && active || !open && active) ? "bg-blue-200 text-blue-500 hover:bg-blue-200 hover:text-blue-500": "",
            (open && !active) ? "bg-gray-100" : ""
        )}>
            <div className="flex items-center gap-2">
                {icon ? <div className="w-6 h-6">{icon}</div> : <></>}
                <div className="flex-1 min-w-0 truncate">
                    <span className="capitalize">{title}</span>
                </div>
                {info && <span className="ml-2">{info}</span>}
            </div>
            {hasChild && (
                <ChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        open ? "rotate-180" : ""
                    )}
                />
            )}
        </Button>
   );

   if (hasChild) return (
        <Collapsible open={open} className="flex flex-col gap-1">
            {content}
            <CollapsibleContent className="collapsibleContentClass ml-6 space-y-1">
                {children?.map((child: NavItemBaseProps) => (
                    <NavLink 
                    end
                    key={child.title}
                    to={child.path}
                    className={({ isActive }) => cn(
                        "block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors",
                        isActive && "text-blue-600 font-medium bg-blue-50/50 dark:bg-blue-950/30"
                    )}>
                        {child.title}
                    </NavLink>
                ))}
            </CollapsibleContent>
        </Collapsible>
    );

    if (externalLink)
      return (
        <Link to={path} target="_blank" rel="noopener noreferrer" className="w-full block">
            {content}
        </Link>
      );

/* -------------------------------- RENDERING ------------------------------- */
    return (
       <Link to={path} className="w-full block">
        {content}
       </Link>
    );
};

export default NavItem;