/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { createContext, useCallback, useMemo, useState } from "react";

// Utils
import type { USER } from "@/types";
import { _users } from "@/_mock";

/* -------------------------------------------------------------------------- */
/*                           USER PROVIDER COMPONENT                          */
/* -------------------------------------------------------------------------- */
type UserContextType = {
  users: USER[];
  addUser: (newUser: USER) => void;
  updateUser: (updatedUser: USER) => void;
  deleteUser: (userId: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<USER[]>(_users);
  
  const addUser = useCallback((newUser: USER) => {
    setUsers((prev) => [newUser, ...prev]);
  }, []);

  const updateUser = useCallback((updatedUser: USER) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  }, []);

  const deleteUser = useCallback((userId: string) => {
    setUsers((prev) => prev.filter((user: { id: string }) => user.id !== userId));
  }, []);

  const memoizedValue = useMemo(() => ({ 
    users, 
    addUser,
    updateUser,
    deleteUser 
  }), [users, addUser, updateUser, deleteUser]);

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <UserContext.Provider value={memoizedValue}>
      {children}
    </UserContext.Provider>
  );
};