/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useParams } from 'react-router-dom';

// UI Local Component
import { useUser } from '../context/use-user';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import UserNewEditForm from '../user-new-edit-form';

// Types
import { paths } from '@/routes/paths';

/* -------------------------------------------------------------------------- */
/*                           USER EDIT VIEW COMPONENT                         */
/* -------------------------------------------------------------------------- */
function UserEditView() {
/* --------------------------------- CONSTS --------------------------------- */
  const { userId } = useParams();
  const { users } = useUser();

  const currentUser = users.find((user) => user.id === userId);
  
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="mx-auto w-full max-w-7xl">
      <CustomBreadcrumbs
        heading='Edit'
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.list },
          { name: currentUser?.fullName ?? 'User', href: currentUser ? paths.dashboard.user.edit(currentUser.id) : paths.dashboard.user.list }
        ]}
      />

      <div className="mt-8">
        <UserNewEditForm currentUser={currentUser} />
      </div>
    </div>
  );
};

export default UserEditView;