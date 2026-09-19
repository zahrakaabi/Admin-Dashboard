/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useContext } from "react";

// Utils
import { UserContext } from "@/sections/user/context/user-context";

/* -------------------------------------------------------------------------- */
/*                             USE USER CUSOM HOOK                            */
/* -------------------------------------------------------------------------- */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};