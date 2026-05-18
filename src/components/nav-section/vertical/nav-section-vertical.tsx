/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { memo } from "react";

// UI Lib Components
import {  
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu
} from "@/components/ui";

// Utils
import type { NavProps, NavGroupProps, NavItemBaseProps } from "../types";
import NavList from "./nav-list";

/* -------------------------------------------------------------------------- */
/*                       NAV SECTION VERTICAL COMPONENT                       */
/* -------------------------------------------------------------------------- */
function NavSectionVertical({ data }: NavProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <nav>
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          subheader={group.subheader}
          items={group.items}
        /> 
      ))}
    </nav>
  )
};

export default memo(NavSectionVertical);

/* -------------------------------------------------------------------------- */
/*                               GROUP COMPONENT                              */
/* -------------------------------------------------------------------------- */
function Group({ subheader, items }: NavGroupProps) {
/* --------------------------------- CONSTS --------------------------------- */
  const renderContent = items.map((item: NavItemBaseProps) => (
    <NavList key={item.title} data={item} />
  ));

/* -------------------------------- RENDERING ------------------------------- */
  return subheader ? (
    <SidebarGroup key={subheader}>
      <SidebarGroupLabel>{subheader}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {renderContent}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ) : (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>{renderContent}</SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};