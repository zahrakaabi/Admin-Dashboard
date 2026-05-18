/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useLocation } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                          USEACTIVELINK CUSTOM HOOK                         */
/* -------------------------------------------------------------------------- */
type ReturnType = boolean;

function useActiveLink(path: string, deep = true): ReturnType {
/* ---------------------------------- HOOKS --------------------------------- */
  const { pathname } = useLocation();

  const checkPath = path.startsWith('#');

  const normalActive = !checkPath && pathname === path;

  const deepActive = !checkPath && (pathname === path || pathname.startsWith(`${path}/`));

/* -------------------------------- RENDERING ------------------------------- */
  return deep ? deepActive : normalActive;
};

export default useActiveLink;