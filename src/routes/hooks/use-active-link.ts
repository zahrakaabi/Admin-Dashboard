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

  if (path.startsWith('#')) {
    return false;
  }

  const normalize = (url: string) =>
    url.replace(/\/\d+(?=\/|$)/g, '/:id');

  const current = normalize(pathname);
  const target = normalize(path);

  if (!deep) {
    return current === target;
  }

/* -------------------------------- RENDERING ------------------------------- */
  return current === target || current.startsWith(`${target}/`);
};

export default useActiveLink;