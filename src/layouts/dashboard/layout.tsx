/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// UI Local Components
import AppSidebar from "./sidebar";

/* -------------------------------------------------------------------------- */
/*                              LAYOUT COMPONENT                              */
/* -------------------------------------------------------------------------- */
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center p-2 shrink-0">
            <SidebarTrigger />
          </header>
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
};

export default Layout;