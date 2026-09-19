/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Outlet } from 'react-router-dom';

// Utils
import { UserProvider } from './context/user-context';

/* -------------------------------------------------------------------------- */
/*                              USER ROUTES LAYOUT                            */
/* -------------------------------------------------------------------------- */
function UserRoutesLayout() {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}

export default UserRoutesLayout;