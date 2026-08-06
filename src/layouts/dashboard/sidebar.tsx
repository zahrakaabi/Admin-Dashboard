/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { ScrollArea, Sidebar, SidebarContent } from "@/components/ui";

// UI Local Components
import Logo from "@/components/logo";
import { NavSectionVertical } from "@/components/nav-section";

// Utils
import { useNavData } from "./config-navigation";
import { cv } from "@/utils";
import { paths } from "@/routes/paths";

/* -------------------------------------------------------------------------- */
/*                              SIDEBAR COMPONENT                             */
/* -------------------------------------------------------------------------- */
function AppSidebar() {
/* --------------------------------- CONSTS --------------------------------- */
  const navData = useNavData();

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Sidebar style={cv({ "--sidebar": "0 0% 100%" })}>
      <ScrollArea>
        <SidebarContent>
          <Logo className="mt-3 ml-4 mb-1" to={paths.dashboard.root} />
          <NavSectionVertical data={navData} />
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  )
};

export default AppSidebar;