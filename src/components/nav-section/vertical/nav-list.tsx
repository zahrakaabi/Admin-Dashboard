/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// // Packages
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// UI Local Components
import NavItem from './nav-item';

// Utils
import type { NavListProps } from '../types';
import { useActiveLink } from '@/routes/hooks';

/* -------------------------------------------------------------------------- */
/*                              NAVLIST COMPONENT                             */
/* -------------------------------------------------------------------------- */
function NavList({ data }: NavListProps) {
/* ---------------------------------- HOOKS --------------------------------- */
  const { pathname } = useLocation();
  const active = useActiveLink(data.path, !!data.children);
  
  const [openMenu, setOpenMenu] = useState(active);

  useEffect(() => {
    if (active) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }, [pathname, active]);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

/* -------------------------------- RENDERING ------------------------------- */
  return <NavItem 
    open={openMenu}
    title={data.title}
    path={data.path}
    active={active}
    icon={data.icon}
    info={data.info}
    externalLink={data.path.startsWith('http')}
    hasChild={!!data.children}
    children={data.children}
    onToggle={handleToggleMenu}
  />
};

export default NavList;